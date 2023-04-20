<template>
  <div class="csg-option" :label="props.label" :value="props.value">
    <slot>
      <div class="csg-option-label">{{ props.label }}</div>
    </slot>
  </div>
</template>
<script setup lang="ts">
interface Props {
  label: string
  value: any
}
const props = defineProps<Props>()
</script>
<style lang="less" scoped>
.csg-option {
  .csg-option-label {
    box-sizing: border-box;
    min-width: 150px;
    height: @height-normal;
    padding: 0 10px;
    display: flex;
    align-items: center;
    border-radius: @base-border-radius;
    transition: all 0.5s;

    &:hover {
      background-color: @base-background-color-1;
    }
  }
}
</style>
