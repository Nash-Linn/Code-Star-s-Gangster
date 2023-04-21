<template>
  <div class="csg-from-item-wrap">
    <label
      v-if="props.label"
      class="csg-from-item-label"
      :style="`width:${props.labelwidth};`"
      :for="props.for"
      >{{ props.label }}</label
    >
    <div class="csg-from-item" :class="props.formId">
      <slot></slot>
      <div class="fail-msg"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  label?: string
  //绑定 label 和 表单组件
  for?: string
  labelwidth?: string
  formId?: string
}

const props = withDefaults(defineProps<Props>(), {})
</script>
<style scoped lang="less">
.csg-from-item-wrap {
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  .csg-from-item-label {
    margin-right: 10px;
    flex-shrink: 0;
    font-weight: bold;
  }

  .csg-from-item {
    flex-grow: 1;
    position: relative;

    .fail-msg {
      position: absolute;
      width: 100%;
      height: 20px;
      bottom: -20px;
      color: @base-danger-color;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
