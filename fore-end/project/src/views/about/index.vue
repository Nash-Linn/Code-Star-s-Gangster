<template>
  <div class="about-warp">
    <div class="about-content">
      <div class="center">
        <div class="center-content"><center /></div>
      </div>
      <div class="left"><left /></div>
      <div class="right"><right /></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import left from './component/left.vue'
import center from './component/center.vue'
import right from './component/right.vue'
</script>
<style lang="less" scoped>
.about-warp {
  width: 100%;
  min-height: @main-height;
  padding: @base-padding;
}

.about-content {
  height: 100px;

  > div {
    float: left;
  }
}
@left-width: 300px;
@right-width: 300px;
.left {
  width: @left-width;
  margin-left: -100%;
}
.right {
  width: @right-width;
  margin-left: -@left-width;
}
.center {
  width: 100%;
  padding: 0 calc(@right-width + 10px) 0 calc(@left-width + 10px);
  box-sizing: border-box;
  .center-content {
    width: 100%;
  }
}
</style>
