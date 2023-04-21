<template>
  <div :class="inputStyle" class="fail">
    <textarea
      class="csg-textarea-inner form-element"
      v-model="value"
      placeholder=" "
      :rows="props.rows"
    />
    <span v-if="props.label" class="csg-textarea-label">{{ props.label }}</span>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'

const emits = defineEmits(['update:modelValue'])
interface Props {
  modelValue: any
  label?: string
  formId?: string
  required?: boolean
  rows: number
  cols: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  rows: 3
})

const value = computed({
  get: () => props.modelValue || '',
  set: (val) => {
    emits('update:modelValue', val)
  }
})

const inputStyle = computed(() => {
  let style: string

  if (props.label) {
    style = ' csg-textarea-wrap-havelabel'
  } else {
    style = ' csg-textarea-wrap'
  }

  if (props.required) {
    style = style + ' required'
  }

  return style
})

const failMsg = ref()
const handleMouseoverTipIcon = () => {
  let inputdom = document.querySelector(`.{props.formId}`)
  failMsg.value = inputdom?.getAttribute('failMsg')
}
</script>
<style lang="less" scoped>
.required {
  position: relative;

  &::before {
    display: block;
    content: '*';
    position: absolute;
    z-index: 1;
    left: 10px;
    top: 50%;
    transform: translate(-50%, calc(-50% + 3px));
    font-size: 20px;
    color: red;
  }
}

.csg-textarea-inner {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px 30px 10px 20px;
  border-radius: @base-border-radius;
  border: 1px solid @base-color-border;
  transition: 0.5s;
  resize: vertical;
  outline: none;

  font-size: 14px;
  font-size: @base-font-size;
  font-family: '微软雅黑';
  color: #333333;

  //隐藏滚动条
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  & {
    -ms-overflow-style: none;
  }
  & {
    overflow: -moz-scrollbars-none;
  }
}

.csg-textarea-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  .csg-textarea-inner:not(:placeholder-shown),
  .csg-textarea-inner:focus {
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

.csg-textarea-wrap-havelabel {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  .csg-textarea-label {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    padding: 0 30px 0 20px;
    pointer-events: none;
    color: @base-placeholder-color;
    transition: 0.5s;
  }

  .csg-textarea-inner:not(:placeholder-shown) ~ .csg-textarea-label,
  .csg-textarea-inner:focus ~ .csg-textarea-label {
    color: @base-color;
    transform: translate(21px, -50%);
    top: 0;
    padding: 0 10px;
    background-color: #fff;
    border-left: 1px solid @base-color;
    border-right: 1px solid @base-color;
  }
  .csg-textarea-inner:not(:placeholder-shown),
  .csg-textarea-inner:focus {
    border-color: @base-color;
  }
}

.fail[failcheck='true'] {
  .csg-textarea-inner {
    border-color: @base-danger-color !important;
  }
  .csg-textarea-inner ~ .csg-textarea-label {
    border-color: @base-danger-color !important;
    color: @base-danger-color !important;
  }
}

.csg-input[failcheck='false'] {
  .csg-textarea-inner {
    border-color: @base-color !important;
  }
}
</style>
