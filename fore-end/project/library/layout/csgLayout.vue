<template>
  <div class="layout">
    <header class="header">
      <csgTopBar />
    </header>
    <div class="content-wrap">
      <div class="content">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
          </keep-alive>
          <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive" />
        </router-view>
      </div>
    </div>
  </div>
  <teleport to="body"><csgWatchUpdate /></teleport>
</template>
<script setup lang="ts">
import csgWatchUpdate from '@lib/components/others/csgWatchUpdate.vue'
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
  position: relative;
}
.header {
  width: 100%;
  position: fixed;
  z-index: 9999;
}

.content-wrap {
  position: relative;
  top: @top-bar-height;
  background-color: @base-background-color;
  min-height: @main-height;
}
.content {
  width: @base-page-width;
  margin: 0 auto;
}
</style>
