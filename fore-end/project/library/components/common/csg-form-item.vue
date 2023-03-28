<template>
  <div class="csg-from-item-wrap">
    <label
      v-if="props.label"
      class="csg-from-item-label"
      :style="`width:${props.labelwidth};`"
      :for="props.for"
      >{{ props.label }}</label
    >
    <div class="csg-from-item">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  label?: string
  //绑定 label 和 表单组件
  for?: string
  labelwidth?: string
}

const props = withDefaults(defineProps<Props>(), {})
</script>
<style scoped lang="less">
.csg-from-item-wrap {
  display: flex;
  align-items: center;
  margin-bottom: 18px;

  .csg-from-item-label {
    margin-right: 10px;
    flex-shrink: 0;
  }

  .csg-from-item {
    flex-grow: 1;
  }
}
</style>
