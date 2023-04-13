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
  position: relative;
  width: 100%;
  min-height: @main-height;
  padding: @base-padding;

  .left {
    position: fixed;
    flex-shrink: 0;
    width: 200px;
    min-height: calc(@main-height - 2 * @base-padding);
    background-color: #fff;
    border-radius: @base-border-radius;
    padding: @base-padding;
  }

  .right {
    width: calc(100% - 220px);
    min-height: calc(@main-height - 2 * @base-padding);
    background-color: #fff;
    border-radius: @base-border-radius;
    padding: @base-padding;
    margin-left: 220px;
  }
}
</style>
