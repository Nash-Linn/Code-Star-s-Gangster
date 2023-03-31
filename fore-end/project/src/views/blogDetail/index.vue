<template>
  <div class="blog-detail-wrap">
    <section class="container">
      <header>
        <span class="title">{{ blogInfo.title }}</span>
      </header>
      <div class="creator-infos">
        <div class="avatar">
          <csg-avatar :imgurl="blogInfo.creatorAvatar" />
        </div>
        <div class="right">
          <div class="creator-name">{{ blogInfo.creatorName }}</div>
          <div class="create-time">{{ parseTime(blogInfo.createTime) }}</div>
        </div>
      </div>
      <div class="content">
        <csgRichText v-model:model-value="blogInfo.content" :toolbar="false" readonly />
      </div>
    </section>
  </div>
</template>
<script setup>
import { reactive, onBeforeMount } from 'vue'
import { getBlogDetail } from '@/api/blogsManage/blogsManage'
import { useRoute } from 'vue-router'
import csgRichText from '@/components/csgRichText.vue'
import { parseTime } from '@/utils'

const route = useRoute()
const blogInfo = reactive({
  title: '',
  content: '',
  createTime: '',
  creatorName: '',
  creatorAvatar: ''
})

const GetBlogDetail = async (id) => {
  await getBlogDetail(id).then((res) => {
    blogInfo.content = res.data.content
    blogInfo.title = res.data.title
    blogInfo.createTime = res.data.createTime
    blogInfo.creatorName = res.data.creatorString
    blogInfo.creatorAvatar = res.data.creatorAvatar
  })
}

onBeforeMount(() => {
  GetBlogDetail(route.params.id)
})
</script>
<style lang="less" scoped>
.blog-detail-wrap {
  width: 100%;
  padding: @base-padding;

  .container {
    padding: @base-padding;
    background-color: #fff;
    border-radius: @base-border-radius;
  }

  .title {
    font-size: @title-font-size-large;
    font-weight: bold;
  }

  .creator-infos {
    margin-top: 20px;
    border: 1px dashed @base-color-border;
    padding: 10px;
    border-radius: @base-border-radius;
    display: flex;
    align-items: center;

    .avatar {
      margin-right: 20px;
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}
</style>
