<template>
  <div class="blog-detail-wrap">
    <header>
      <span class="title">{{ blogInfo.title }}</span>
    </header>
    <div class="content">
      <csgRichText v-model:model-value="blogInfo.content" :toolbar="false" readonly />
    </div>
  </div>
</template>
<script setup>
import { reactive, onBeforeMount } from 'vue'
import { getBlogDetail } from '@/api/blogsManage/blogsManage'
import { useRoute } from 'vue-router'
import csgRichText from '@/components/csgRichText.vue'

const route = useRoute()
const blogInfo = reactive({
  title: '',
  content: ''
})

const GetBlogDetail = async (id) => {
  await getBlogDetail(id).then((res) => {
    blogInfo.content = res.data.content
    blogInfo.title = res.data.title
  })
}

onBeforeMount(() => {
  GetBlogDetail(route.params.id)
})
</script>
<style lang="less" scoped>
.blog-detail-wrap {
  width: 100%;
  margin: @base-margin;
  padding: @base-padding;
  background-color: #fff;
  border-radius: @base-border-radius;

  .title {
    font-size: @title-font-size-large;
    font-weight: bold;
  }
}
</style>
