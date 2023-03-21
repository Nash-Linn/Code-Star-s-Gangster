<template>
  <div class="csg-input-wrap" :class="sizeStyle">
    <input class="csg-input-inner" :type="props.type" v-model="value" />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

const emits = defineEmits(['update:modelValue'])
interface Props {
  modelValue: any
  size?: string
  type?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'normal',
  type: 'text'
})

const value = computed({
  get: () => props.modelValue || '',
  set: (val) => {
    emits('update:modelValue', val)
  }
})

const sizeStyle = computed(() => {
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
  return style
})
</script>
<style lang="less" scoped>
.size-big {
  height: 40px !important;
}

.size-normal {
  height: 30px !important;
}

.size-small {
  height: 20px !important;
}

.csg-input-wrap {
  border-radius: @base-border-radius;
  border: 1px solid @base-color-border;
  overflow: hidden;
  padding: 0 20px;
  height: 20px;
  display: flex;
  align-items: center;

  .csg-input-inner {
    width: 100%;
    height: 100%;
  }

  // 去除 input 类型为 number 时 自带的 上下箭头
  // 谷歌
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }
  // //火狐
  input[type='number'] {
    -moz-appearance: textfield;
  }
}
</style>
