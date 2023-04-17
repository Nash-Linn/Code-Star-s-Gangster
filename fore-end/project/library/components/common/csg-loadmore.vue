<template>
  <div>
    <template v-if="loading">
      <div>加载中...</div>
    </template>
    <template v-else>
      <div v-if="more">加载更多</div>
      <div v-else>没有了</div>
    </template>
  </div>
</template>
<script setup lang="ts">
interface Props {
  more: boolean
  loading: boolean
}

withDefaults(defineProps<Props>(), {
  more: false
})
</script>
<style lang="less" scoped></style>
