<template>
  <div class="container-wrap">
    <csgBlogMenu class="blog-menu" :data="baseInfo.content" />
    <div class="blog-container">
      <csg-card>
        <csgRichText v-model:model-value="baseInfo.content" class="pulish-blog-wrap" />
      </csg-card>
      <csg-card class="base-info-wrap">
        <csg-forms ref="formRef" :model="baseInfo" class="form-wrap">
          <div class="form-part1">
            <csg-form-item class="form-item" label="文章标题">
              <csg-input formId="username" v-model="baseInfo.title" required />
            </csg-form-item>
          </div>
          <div class="form-part2">
            <csg-form-item class="form-item form-cover" label="文章封面">
              <csg-upload
                type="pictureCard"
                @change="handleCoverChange"
                :limit="1"
                :fileList="blogCover"
              />
            </csg-form-item>
            <csg-form-item class="form-item form-summary" label="文章摘要">
              <csg-textarea class="textarea-summary" v-model="baseInfo.summary" type="textarea" />
            </csg-form-item>
          </div>
          <csg-form-item class="form-item" label="文章标签">
            <csg-tag
              v-for="(item, index) in tagsList"
              :key="index"
              class="tag-item"
              close
              @on-close="handleDeleteTag(item.id)"
              >{{ item.name }}</csg-tag
            >
            <csg-button v-if="!tagExceed" @click="handleTagDialogVisible">添加标签</csg-button>
          </csg-form-item>
        </csg-forms>
        <div class="button-wrap">
          <csg-button class="button" @click="handlePublish">发布</csg-button>
        </div>
      </csg-card>
    </div>
  </div>
  <teleport to="body">
    <tagDialog v-model="tagDialogVisible" @click-tag="handleAddTag" />
  </teleport>
</template>
<script setup lang="ts">
import csgRichText from '@/components/csgRichText.vue'
import tagDialog from './components/tagDialog.vue'
import csgBlogMenu from '@/components/csgBlogMenu.vue'

import { ref, reactive, inject, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { create, update } from '@/api/blogsManage/blogsManage'
import { useRouter } from 'vue-router'
import { getBlogDetail } from '@/api/blogsManage/blogsManage'
import { baseURL } from '@/config'
import { isEmpty } from '@/utils/validate'
import type { TagItem } from './interface/tag'
const route = useRoute()

const router = useRouter()

const $csgMessage: any = inject('$csgMessage')
// 内容 HTML

const blogId = ref()
const blogCover: any[] = reactive([])

interface BaseInfo {
  title: string
  summary: string
  content: string
  cover: any
}

const baseInfo: BaseInfo = reactive({
  title: '',
  summary: '',
  content: '',
  cover: null
})

const handleCoverChange = (val: any) => {
  baseInfo.cover = val.file
}

const tagDialogVisible = ref(false)
const tagsList = ref<TagItem[]>([])
const tagExceed = ref(false)
const handleTagDialogVisible = () => {
  tagDialogVisible.value = true
}
const handleAddTag = (tagInfo: TagItem) => {
  tagExceed.value = false
  if (tagsList.value.length >= 5) {
    tagExceed.value = true
    return
  }
  if (tagsList.value.findIndex((item) => item.id == tagInfo.id) == -1) {
    tagsList.value.push(tagInfo)
  }
}

const handleDeleteTag = (tagId: number) => {
  let index = tagsList.value.findIndex((item) => item.id == tagId)
  tagsList.value.splice(index, 1)
  tagExceed.value = false
}

const verify = () => {
  if (isEmpty(baseInfo.title)) {
    $csgMessage({
      type: 'danger',
      message: '请输入标题'
    })
    return false
  }
  if (baseInfo.content == '<p><br></p>') {
    $csgMessage({
      type: 'danger',
      message: '请输入内容'
    })
    return false
  }

  return true
}

const handlePublish = () => {
  if (!verify()) {
    return
  }
  const form = new FormData()
  form.append('title', baseInfo.title)
  form.append('summary', baseInfo.summary)
  form.append('content', baseInfo.content)
  if (!isEmpty(baseInfo.cover)) {
    form.append('file', baseInfo.cover.raw)
  }

  if (!isEmpty(tagsList.value)) {
    let tags = tagsList.value.map((item) => item.id)
    form.append('tags', JSON.stringify(tags))
  }

  if (blogId.value) {
    form.append('id', blogId.value)
    Update(form)
  } else {
    Create(form)
  }
}

const Create = (data: any) => {
  create(data).then((res) => {
    if (res.code == 200) {
      $csgMessage({
        type: 'success',
        message: '发布成功！'
      })

      router.push(`/blogDetail/${res.data.id}`)
    }
  })
}
const Update = (data: any) => {
  update(data).then((res) => {
    if (res.code == 200) {
      $csgMessage({
        type: 'success',
        message: '发布成功！'
      })
      router.push(`/blogDetail/${res.data.id}`)
    }
  })
}

const onload = async () => {
  if (route.query.id) {
    blogId.value = route.query.id
    GetBlogDetail(blogId.value)
  }
}

const dealBlogInfo = (data: any) => {
  baseInfo.content = data.content
  baseInfo.title = data.title
  baseInfo.summary = data.summary
  if (data.coverUrl) {
    blogCover.push({
      name: data.coverUrl,
      src: baseURL + '/blogsManage/cover/' + data.coverUrl,
      status: 'old'
    })
  }
  tagsList.value = data.tags
}

const GetBlogDetail = async (id: string) => {
  await getBlogDetail(id).then((res) => {
    dealBlogInfo(res.data)
  })
}
onBeforeMount(() => {
  onload()
})
</script>
<style scoped lang="less">
@menu-width: 200px;
.container-wrap {
  position: relative;
  padding: @base-padding;
  display: flex;
}

.blog-menu {
  width: @menu-width;
  flex-shrink: 0;
  position: fixed;
  top: calc(@top-bar-height + @base-padding);
  height: calc(@main-height - 40px);
}
.blog-container {
  position: relative;
  left: calc(@menu-width + 10px);
  width: calc(100% - @menu-width - 10px);
  border-radius: @base-border-radius;
}
.base-info-wrap {
  width: 100%;
  padding: @base-padding;

  .form-wrap {
    width: 100%;

    .form-part2 {
      display: flex;

      .form-cover {
        margin-right: 20px;
      }

      .form-summary {
        flex-grow: 1;

        .textarea-summary {
          min-height: 100px;
          :deep(.csg-textarea-inner) {
            min-height: 100px;
          }
        }
      }
    }
  }
}
.pulish-blog-wrap {
  margin-bottom: 20px;
  width: 100%;
  padding: @base-padding;
  padding-top: 0;
}

.tag-item {
  margin-right: 10px;
}

.button-wrap {
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
