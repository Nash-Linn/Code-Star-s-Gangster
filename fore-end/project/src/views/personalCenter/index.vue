<template>
  <div class="personal-center-wrap">
    <div class="left">
      <menus />
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import menus from './components/menus.vue'
</script>
<style scoped lang="less">
.personal-center-wrap {
  width: 100%;
  min-height: @main-height;
  padding: @base-padding;

  display: flex;

  .left {
    flex-shrink: 0;
    width: 200px;
    background-color: #fff;
    border-radius: @base-border-radius;
    margin-right: 20px;
    padding: @base-padding;
  }

  .right {
    width: 100%;
    background-color: #fff;
    border-radius: @base-border-radius;
    padding: @base-padding;
  }
}
</style>
