<template>
  <div class="index-wrap">
    <csgBlogCard class="blog-card" v-for="(item, index) in blogList" :key="index" :data="item" />
    <!-- <csg-loadmore :more="showMore" :loading="loading" /> -->
  </div>
</template>
<script setup lang="ts">
import csgBlogCard from '@/components/csgBlogCard.vue'

import { onMounted, ref, reactive, inject } from 'vue'
import { getList } from '@/api/blogsManage/blogsManage'

const $sub = inject('$sub') as Function

$sub('topbar-search', (val: string) => {
  GetList({ keyword: val })
})

const blogList: any = ref([])

const GetList = (data: any) => {
  loading.value = true
  getList(data)
    .then((res) => {
      let data = res.data.data
      if (data.length > 0) {
        blogList.value.push(...data)
      }

      let total = res.data.total
      if (total > filters.page * filters.pageSize) {
        showMore.value = true
        filters.page++
      }
    })
    .finally(() => {
      loading.value = false
    })
}

//加载更多
const filters = reactive({
  page: 1,
  pageSize: 10
})
//显示加载更多
const showMore = ref(false)
const loading = ref(false)

const handleLoadMore = () => {
  console.log('到底加载更多')
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
