<template>
  <div class="index-wrap">
    <div class="content">{{ blogList }}</div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getList } from '@/api/blogsManage/blogsManage'

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
  padding: @base-padding;
  .content {
    width: 100%;
    min-height: @main-height;
    padding: @base-padding;
    border-radius: @base-border-radius;
    background-color: #fff;
  }
}
</style>
