<template>
  <div class="csg-card-wrap">
    <slot />
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="less">
.csg-card-wrap {
  background-color: #fff;
  border-radius: @base-border-radius;
  box-shadow: @base-box-shadow;
}
</style>
