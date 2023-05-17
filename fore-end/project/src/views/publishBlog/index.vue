<template>
  <div class="container-wrap" :class="[showMenu ? 'show-menu' : 'no-menu']">
    <csgBlogMenu
      v-show="showMenu"
      class="blog-menu"
      :data="baseInfo.content"
      @menu-change="handleMenuChange"
    />
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
            <csg-button v-show="!tagExceed" @click="handleTagDialogVisible">添加标签</csg-button>
            <span class="tag-tip">（最多可添加五个标签）</span>
          </csg-form-item>
        </csg-forms>
        <div class="button-wrap">
          <csg-button class="button" @click="handlePublish">发布</csg-button>
        </div>
      </csg-card>
    </div>
  </div>
  <div class="fixed-button">
    <div v-if="hasMenu" class="menu-button" @click="handleMenuShow">
      <svg
        t="1684313970449"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2530"
        width="40"
        height="40"
      >
        <path
          d="M805.8 205.4v-1.1c0-13.6-11.1-24.7-24.7-24.7H264.4c-13.6 0-24.7 11.1-24.7 24.7V818.6c0 6.2 2.2 11.9 5.9 16.4 0.3 0.3 0.5 0.6 0.8 0.9 2.2 2.4 4.9 4.5 7.9 5.9 3.4 1.6 7.2 2.6 11.2 2.6H780.1c14.2 0 25.8-11.6 25.8-25.8V205.4h-0.1z m-514.6 25.8h463v561.7h-463V231.2z"
          p-id="2531"
          fill="#4ed2d2"
        ></path>
        <path
          d="M678.9 393.2H468.5c-14.2 0-25.8-11.6-25.8-25.8 0-14.2 11.6-25.8 25.8-25.8h210.3c14.2 0 25.8 11.6 25.8 25.8 0 14.2-11.6 25.8-25.7 25.8zM400.5 393.2h-42.1c-14.2 0-25.8-11.6-25.8-25.8 0-14.2 11.6-25.8 25.8-25.8h42.1c14.2 0 25.8 11.6 25.8 25.8 0 14.2-11.6 25.8-25.8 25.8zM678.9 545.4H358.4c-14.2 0-25.8-11.6-25.8-25.8 0-14.2 11.6-25.8 25.8-25.8h320.4c14.2 0 25.8 11.6 25.8 25.8 0 14.2-11.6 25.8-25.7 25.8zM678.9 693H358.4c-14.2 0-25.8-11.6-25.8-25.8 0-14.2 11.6-25.8 25.8-25.8h320.4c14.2 0 25.8 11.6 25.8 25.8 0 14.2-11.6 25.8-25.7 25.8z"
          p-id="2532"
          fill="#4ed2d2"
        ></path>
      </svg>
      <span>目录</span>
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

import { ref, reactive, computed, inject, onBeforeMount } from 'vue'
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

const hasMenu = ref(false)

const handleMenuChange = (val: any) => {
  if (val.length == 0) {
    hasMenu.value = false
  } else {
    hasMenu.value = true
  }
}
const manualShowMenu = ref(false)
const handleMenuShow = () => {
  manualShowMenu.value = !manualShowMenu.value
}

const showMenu = computed(() => {
  return hasMenu.value && manualShowMenu.value
})
</script>
<style scoped lang="less">
@menu-width: 200px;

.show-menu {
  .blog-container {
    width: calc(100% - @menu-width - 10px) !important;
    left: calc(@menu-width + 10px) !important;
  }
}

.no-menu {
  .blog-container {
    width: 100% !important;
    left: 0 !important;
  }
}

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

.tag-tip {
  color: @base-placeholder-color;
}

.button-wrap {
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.fixed-button {
  position: fixed;
  bottom: 100px;
  left: calc(50% + @base-page-width / 2);

  .menu-button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.5s;

    svg {
      display: block;
    }
    span {
      display: none;
      color: @base-color;
    }

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      svg {
        display: none;
      }
      span {
        display: block;
      }
    }
  }
}
</style>
