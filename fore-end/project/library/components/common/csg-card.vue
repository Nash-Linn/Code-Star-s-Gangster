<template>
  <div class="csg-card-wrap" :class="{ hover: hover }">
    <slot />
  </div>
</template>
<script setup lang="ts">
interface Props {
  hover?: boolean
}
defineProps<Props>()
</script>
<style scoped lang="less">
.csg-card-wrap {
  background-color: #fff;
  border-radius: @base-border-radius;
  box-shadow: @base-box-shadow;
  transition: 0.5s;
}
.hover {
  &:hover {
    box-shadow: @base-box-shadow-deep;
  }
}
</style>
