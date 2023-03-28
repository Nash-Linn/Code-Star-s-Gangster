<template>
  <div class="csg-card-wrap">
    <slot />
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="less">
.csg-card-wrap {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: @base-border-radius;
  box-shadow: @base-box-shadow;
}
</style>
