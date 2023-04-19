<template>
  <div class="content-manage-wrap" ref="contentManageRef">
    <div class="header-wrap">
      <header class="header">
        <div class="title">内容管理</div>
        <div class="search">
          <csg-input v-model="filters.keyword" @keyup.enter="handleSearch" label="搜索文章">
            <template #suffix>
              <div class="suffix-icon" @click="handleSearch">
                <img id="inactive" src="@/assets/icons/search1.png" alt="" />
                <img id="active" src="@/assets/icons/search2.png" alt="" />
              </div>
            </template>
          </csg-input>
        </div>
      </header>
      <div class="divide-line"></div>
    </div>

    <div class="content">
      <csg-scroll class="scroll" :height="scrollHeight" @on-max="handleLoadMore">
        <div class="scroll-inner">
          <csgBlogCard
            class="blog-card"
            v-for="(item, index) in blogList"
            :key="index"
            :data="item"
          >
            <template #bottom-right>
              <div class="bottom-right">
                <div class="edit-button" @click.stop="handleEditBlog(item)">编辑</div>
                <div class="delete-button" @click.stop="handleDeleteBlog(item)">删除</div>
              </div>
            </template>
          </csgBlogCard>
          <csg-loadmore :more="showMore" :loading="loading" />
        </div>
      </csg-scroll>
    </div>
  </div>
  <teleport to="body">
    <csgTipDialog
      v-model="deleteDialogVisable"
      message="确认删除该文章？"
      @on-confirm="handleConfirm"
    />
  </teleport>
</template>
<script setup lang="ts">
import csgBlogCard from '@/components/csgBlogCard.vue'
import csgTipDialog from '@/components/csgTipDialog.vue'
import { ref, reactive, computed, inject, onBeforeMount } from 'vue'
import { getMyBlogList, deleteBlog } from '@/api/blogsManage/blogsManage'
import { useRouter } from 'vue-router'

const router = useRouter()
const $csgMessage = inject('$csgMessage') as Function

const contentManageRef = ref()
const scrollHeight = computed(() => {
  let height = contentManageRef.value ? contentManageRef.value?.clientHeight : 0
  return height - 52 - 20 - 20
})

const filters = reactive({
  page: 1,
  pageSize: 10,
  keyword: ''
})

const handleSearch = () => {
  filters.page = 1
  blogList.value.length = 0
  GetMyBlogList(filters)
}

const blogList: any = ref([])

//显示加载更多
const showMore = ref(false)
const loading = ref(false)

const handleLoadMore = () => {
  if (loading.value || !showMore.value) {
    return
  }
  GetMyBlogList(filters)
}

const GetMyBlogList = (data: any) => {
  loading.value = true
  getMyBlogList(data)
    .then((res) => {
      let data = res.data.data
      if (data.length > 0) {
        blogList.value.push(...data)
      }

      let total = res.data.total
      if (total > filters.page * filters.pageSize) {
        showMore.value = true
        filters.page++
      } else {
        showMore.value = false
      }
    })
    .finally(() => {
      loading.value = false
    })
}

const handleEditBlog = (blog: any) => {
  router.push({
    name: 'PublishBlog',
    query: { id: blog.id }
  })
}

const deleteDialogVisable = ref(false)
const deleteBlogId = ref()
const handleDeleteBlog = (blog: any) => {
  deleteDialogVisable.value = true
  deleteBlogId.value = blog.id
}

const handleConfirm = () => {
  DeleteBlog(deleteBlogId.value)
}

const DeleteBlog = (id: string) => {
  deleteBlog(id).then((res) => {
    if (res.code == 200) {
      deleteDialogVisable.value = false
      $csgMessage({
        type: 'success',
        message: '成功！'
      })
      onload()
    }
  })
}

const onload = () => {
  GetMyBlogList(filters)
}
onBeforeMount(() => {
  onload()
})
</script>
<style lang="less" scoped>
.content-manage-wrap {
  height: calc(@main-height - 2 * @base-padding);
}
.header-wrap {
  padding: @base-padding;
  padding-bottom: 0px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    font-size: @title-font-size;
    font-weight: bold;
  }

  .suffix-icon {
    height: 100%;
    width: 30px;
    cursor: pointer;

    img {
      width: 30px;
    }

    #active {
      display: none;
    }

    &:hover {
      #inactive {
        display: none;
      }
      #active {
        display: block;
      }
    }
  }

  margin-bottom: 20px;
}

.content {
  margin-top: 10px;
  padding: 0 10px;
  .blog-card {
    margin-bottom: 10px;

    .bottom-right {
      display: flex;

      .edit-button {
        margin-right: 20px;

        &:hover {
          color: @base-color;
        }
      }

      .delete-button {
        &:hover {
          color: @base-color;
        }
      }
    }
  }
}

.scroll {
  border-radius: @base-border-radius;
  overflow: hidden;

  .scroll-inner {
    padding: 10px;
  }
}
</style>
