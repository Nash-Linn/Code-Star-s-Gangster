<template>
  <div class="topbar">
    <div class="topbar-content">
      <div class="left">
        <div class="left-item">
          <router-link to="/">博客</router-link>
        </div>
      </div>
      <div class="center">
        <csgTopSearch />
      </div>
      <div class="right">
        <csgTopBarAvatar />
      </div>
    </div>
  </div>
</template>
<script setup>
import csgTopSearch from './csgTopSearch.vue'
import csgTopBarAvatar from './csgTopBarAvatar.vue'
</script>
<style scoped lang="less">
.topbar {
  width: 100%;
  height: @top-bar-height;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  .topbar-content {
    height: 100%;
    width: @base-page-width;
    margin: 0 auto;
    display: flex;
    padding: 0 @base-padding;

    align-items: center;
    .left {
      width: 300px;
      display: flex;
      flex-shrink: 0;
      .left-item {
        height: 100%;
        cursor: pointer;
      }
    }

    .center {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
    }

    .right {
      flex-shrink: 0;
      width: 300px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
