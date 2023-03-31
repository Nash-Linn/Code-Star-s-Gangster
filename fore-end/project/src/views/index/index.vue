<template>
  <div class="index-wrap">
    <csgBlogCard class="blog-card" v-for="(item, index) in blogList" :key="index" :data="item" />
  </div>
</template>
<script setup lang="ts">
import csgBlogCard from '@/components/csgBlogCard.vue'

import { onMounted, ref, inject } from 'vue'
import { getList } from '@/api/blogsManage/blogsManage'

const $sub = inject('$sub') as Function

$sub('topbar-search', (val: string) => {
  console.log('val', val)
})

const blogList: any = ref([])

const GetList = (data: any) => {
  getList(data).then((res) => {
    blogList.value = res.data.data
  })
}

const onload = () => {
  GetList({})
}
onMounted(() => {
  onload()
})
</script>
<style lang="less" scoped>
.index-wrap {
  width: 100%;
  padding: @base-padding;
  .blog-card {
    margin-bottom: 10px;
  }
}
</style>
