<template>
  <div class="csg-button-wrap" :class="buttonStyle">
    <div class="csg-button-inner">
      <slot
        ><span> {{ props.label }}</span></slot
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
interface Props {
  label: string
  size?: string
  type?: string
}
const props = withDefaults(defineProps<Props>(), {
  size: 'normal',
  type: 'default'
})

const buttonStyle = computed(() => {
  let style: string
  switch (props.size) {
    case 'big':
      style = 'size-big'
      break

    case 'normal':
      style = 'size-normal'
      break

    case 'small':
      style = 'size-small'
      break

    default:
      style = 'size-normal'
      break
  }

  let bgStyle: string
  switch (props.type) {
    case 'success':
      bgStyle = 'success-bg'
      break

    case 'warn':
      bgStyle = 'warn-bg'
      break

    case 'danger':
      bgStyle = 'danger-bg'
      break

    default:
      bgStyle = 'default-bg'
      break
  }

  return style + ' ' + bgStyle
})
</script>
<style lang="less" scoped>
.size-big {
  height: 50px !important;
}

.size-normal {
  height: 40px !important;
}

.size-small {
  height: 30px !important;
}

.success-bg {
  background-color: @base-success-color !important;
}
.warn-bg {
  background-color: @base-warn-color !important;
}
.danger-bg {
  background-color: @base-danger-color !important;
}
.default-bg {
  background-color: @base-color !important;
}

.csg-button-wrap {
  position: relative;
  background-color: @base-color;
  border-radius: @base-border-radius;
  padding: 0 20px;
  display: inline-block;
  cursor: pointer;
  user-select: none;
  opacity: 1;
  transition: 0.5s;

  .csg-button-inner {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
}

.csg-button-wrap:hover {
  opacity: 0.7;
}

.csg-button-wrap:active {
  opacity: 1;
}

.csg-button-wrap::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  box-shadow: 0 0 5px @base-box-shadow-color-7;
  transition: 0.3s;
}

.csg-button-wrap:active::after {
  opacity: 1;
  transform: 0s;
}
</style>
