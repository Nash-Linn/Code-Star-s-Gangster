<template>
  <div :class="inputStyle">
    <input
      :id="props.formId"
      class="csg-input-inner"
      :type="props.type"
      v-model="value"
      placeholder=" "
    />
    <span v-if="props.label" class="csg-input-label">{{ props.label }}</span>
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
  formId?: string
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'normal',
  type: 'text',
  required: false
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
  height: 50px !important;
}

.size-normal {
  height: 40px !important;
}

.size-small {
  height: 30px !important;
}

.required {
  position: relative;

  &::before {
    display: block;
    content: '*';
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translate(-50%, calc(-50% + 3px));
    font-size: 20px;
    color: red;
  }
}

.csg-input-wrap {
  width: 100%;
  .csg-input-inner {
    width: 100%;
    height: 100%;
    border-radius: @base-border-radius;
    border: 1px solid @base-color-border;
    overflow: hidden;
    padding: 0 20px;
    display: flex;
    align-items: center;
    transition: 0.5s;
  }

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

  .csg-input-inner {
    width: 100%;
    height: 100%;
    padding: 0px 20px;

    border-radius: @base-border-radius;
    border: 1px solid @base-color-border;
    outline: none;

    transition: 0.5s;
  }

  .csg-input-label {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    padding: 0px 20px;
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
</style>
