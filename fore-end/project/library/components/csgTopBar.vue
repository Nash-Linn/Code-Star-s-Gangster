<template>
  <div class="topbar">
    <div class="topbar-content">
      <div class="left">
        <div class="left-item">博客</div>
      </div>
      <div class="center">
        <csgTopBar />
      </div>
      <div class="right">
        <csgTopBarAvatar />
      </div>
    </div>
  </div>
</template>
<script setup>
import csgTopBar from './csgTopSearch.vue'
import csgTopBarAvatar from './csgTopBarAvatar.vue'
</script>
<style scoped lang="less">
.topbar {
  width: 100%;
  height: 50px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);

  .topbar-content {
    height: 100%;
    width: 1300px;
    margin: 0 auto;
    display: flex;

    align-items: center;

    .left {
      width: 300px;
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
      width: 300px;

      display: flex;

      justify-content: flex-end;
    }
  }
}
</style>
