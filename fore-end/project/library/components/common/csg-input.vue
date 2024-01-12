<template>
  <div :class="inputStyle" class="fail">
    <input
      class="csg-input-inner form-element"
      :type="props.type"
      v-model="value"
      :placeholder="props.placeholder"
    />
    <span v-if="props.label" class="csg-input-label">{{ props.label }}</span>

    <div class="require-icon">*</div>
    <div class="suffix-icon">
      <slot name="suffix"> </slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

const emits = defineEmits(['update:modelValue'])
interface Props {
  modelValue: any
  size?: string
  type?: string
  label?: string
  required?: boolean
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'normal',
  type: 'text',
  required: false,
  placeholder: ' '
})

const value = computed({
  get: () => props.modelValue || '',
  set: (val) => {
    emits('update:modelValue', val)
  }
})

const inputStyle = computed(() => {
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

  if (props.label) {
    style = style + ' csg-input-wrap-havelabel'
  } else {
    style = style + ' csg-input-wrap'
  }

  if (props.required) {
    style = style + ' required'
  }

  return style
})
</script>
<style lang="less" scoped>
.size-big {
  height: @height-big !important;
}

.size-normal {
  height: @height-normal !important;
}

.size-small {
  height: @height-small!important;
}

.required {
  // position: relative;

  // &::before {
  //   display: block;
  //   content: '*';
  //   position: absolute;
  //   left: 10px;
  //   top: 50%;
  //   transform: translate(-50%, calc(-50% + 3px));
  //   z-index: 1;
  //   font-size: 20px;
  //   color: red;
  // }

  .require-icon {
    width: 20px;
    height: 100%;

    color: red;
    font-size: 20px;
    position: absolute;
    left: 0;
    top: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.require-icon {
  display: none;
}

.csg-input-inner {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: @base-border-radius;
  border: 1px solid @base-color-border;
  padding: 0 30px 0 20px;
  transition: 0.5s;

  font-size: 14px;
  font-size: @base-font-size;
  font-family: '微软雅黑';
  color: #333333;
}

.csg-input-wrap {
  position: relative;
  width: 100%;
  .csg-input-inner:not(:placeholder-shown),
  .csg-input-inner:focus {
    border-color: @base-color;
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

.csg-input-wrap-havelabel {
  position: relative;
  width: 100%;

  .csg-input-label {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    padding: 0 30px 0 20px;
    pointer-events: none;
    color: @base-placeholder-color;
    transition: 0.5s;
  }

  .csg-input-inner:not(:placeholder-shown) ~ .csg-input-label,
  .csg-input-inner:focus ~ .csg-input-label {
    color: @base-color;
    transform: translate(21px, -50%);
    top: 0;
    padding: 0 10px;
    background-color: #fff;
    border-left: 1px solid @base-color;
    border-right: 1px solid @base-color;
  }
  .csg-input-inner:not(:placeholder-shown),
  .csg-input-inner:focus {
    border-color: @base-color;
  }
}

.fail[failcheck='true'] {
  .csg-input-inner {
    border-color: @base-danger-color !important;
  }
  .csg-input-inner ~ .csg-input-label {
    border-color: @base-danger-color !important;
    color: @base-danger-color !important;
  }
}

.csg-input[failcheck='false'] {
  .csg-input-inner {
    border-color: @base-color !important;
  }
}

.suffix-icon {
  width: 30px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
