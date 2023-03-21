<template>
  <div class="layout">
    <header class="header">
      <csgTopBar />
    </header>
    <div class="content"></div>
  </div>
</template>
<script setup lang="ts">
import csgTopBar from '@/components/csgTopBar.vue'
</script>
<style scoped lang="less">
.layout {
  background-color: @base-background-color;
}
.header {
  position: relative;
  z-index: 9999;
}
.content {
  width: @base-page-width;
  height: @main-height;
  margin: 0 auto;
}
</style>
