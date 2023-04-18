<template>
  <div class="csg-loadmore">
    <template v-if="loading">
      <div class="load" :style="`color:${loadColor}`">加载中...</div>
    </template>
    <template v-else>
      <div v-if="more">加载更多</div>
      <div v-else class="nomore" :style="`color:${nomoreColor}`">没有了</div>
    </template>
  </div>
</template>
<script setup lang="ts">
interface Props {
  more: boolean
  loading: boolean
  loadColor: string
  nomoreColor: string
}

withDefaults(defineProps<Props>(), {
  more: false
})
</script>
<style lang="less" scoped>
.csg-loadmore {
  display: flex;
  justify-content: center;
  .load {
    color: @base-color;
  }

  .nomore {
    color: @base-color;
  }
}
</style>
