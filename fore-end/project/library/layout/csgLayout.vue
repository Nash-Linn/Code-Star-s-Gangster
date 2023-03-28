<template>
  <div class="layout">
    <header class="header">
      <csgTopBar />
    </header>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>
<script setup lang="ts">
import csgTopBar from '@/components/csgTopBar.vue'
import { useUserStore } from '@/stores/modules/user'
import { getToken } from '@/utils/token'
const { getUserInfo } = useUserStore()

if (getToken()) {
  getUserInfo()
}
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
  min-height: @main-height;
  margin: 0 auto;
}
</style>
