<template>
  <csg-popover padding="0" :visible="true" v-click-outside="handleClickInputOut">
    <template #reference>
      <div
        :class="inputStyle"
        class="fail"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
      >
        <input
          ref="selectRef"
          class="csg-select-inner form-element"
          :readonly="!props.filter"
          v-model="inputValue"
          :placeholder="props.placeholder"
          @input="handleInput"
          @focus="handleClickInput"
        />

        <span v-if="props.label" class="csg-select-label">{{ props.label }}</span>
        <div class="require-icon">*</div>
        <div class="suffix-icon">
          <span class="suffix-inner">
            <i v-show="showClose" @click="handleClear">
              <svg
                class="icon"
                height="14"
                viewBox="0 0 1024 1024"
                width="14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512z"
                  fill="currentColor"
                />
                <path
                  d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
                  fill="currentColor"
                />
              </svg>
            </i>
            <i
              v-show="!showClose"
              class="arrows-icon"
              :class="[popoverVisible ? 'arrows-icon-up' : '']"
              @click="handleClickArrow"
            >
              <svg
                class="icon"
                height="14"
                viewBox="0 0 1024 1024"
                width="14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M488.832 344.32l-339.84 356.672a32 32 0 000 44.16l.384.384a29.44 29.44 0 0042.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0042.688 0l.384-.384a32 32 0 000-44.16L535.168 344.32a32 32 0 00-46.336 0z"
                  fill="currentColor"
                />
              </svg>
            </i>
          </span>
        </div>
      </div>
    </template>
    <div ref="optionsRef" class="options-wrap">
      <csg-option
        v-for="(item, index) in optionsList"
        :key="index"
        :selected="item[props.valueName] == value"
        :label="item[props.labelName]"
        :value="item[props.valueName]"
        @click="handleChose(item)"
      />
    </div>
  </csg-popover>
</template>
<script setup lang="ts">
import { isEmpty } from '@/utils/validate'
import { ref, computed, watch, nextTick } from 'vue'

const emits = defineEmits(['update:modelValue', 'on-change'])
interface Props {
  modelValue: any // 绑定的值
  options: any[] // 下拉框的选项
  size?: string // 输入框的大小
  label?: string // 输入框前的标签
  required?: boolean // 是否必填
  placeholder?: string // 输入框的提示文字
  filter?: boolean // 是否开启过滤
  labelName?: string // 对应 options 中的 label键名
  valueName?: string // 对应 options 中的 value键名
  clearable?: boolean // 是否显示清空按钮
}

const props = withDefaults(defineProps<Props>(), {
  size: 'normal',
  required: false,
  placeholder: ' ',
  filter: false,
  labelName: 'label',
  valueName: 'value',
  clearable: false
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

const mouseenter = ref(false)
const handleMouseenter = () => {
  mouseenter.value = true
}
const handleMouseleave = () => {
  mouseenter.value = false
}

const showClose = computed(() => {
  return props.clearable && mouseenter.value && !isEmpty(value.value)
})

// 对应 labelName 的值
const inputValue = ref()

// 对应 valueName 的值
const value = computed({
  get: () => {
    return props.modelValue || ''
  },
  set: (val) => {
    emits('update:modelValue', val)
  }
})

watch(
  [() => props.modelValue, () => props.options],
  (newValue) => {
    if (newValue[1].length > 0 && (newValue[0] !== undefined || newValue[0] !== null)) {
      let matchOption = newValue[1].filter((item) => item[props.valueName] == newValue[0]).pop()
      if (matchOption) {
        inputValue.value = matchOption[props.labelName]
      }
    }
  },
  {
    immediate: true
  }
)

const popoverVisible = ref(false)

const optionsRef = ref()
watch(
  () => popoverVisible.value,
  (val) => {
    if (val) {
      optionsRef.value.style.transition = 'none'
      optionsRef.value.style.height = 'auto'
      const height = optionsRef.value.offsetHeight
      optionsRef.value.style.height = 0
      optionsRef.value.offsetHeight
      optionsRef.value.style.transition = 'height 0.5s'
      optionsRef.value.style.height = height + 'px'
    } else {
      optionsRef.value.style.height = 0
      optionsRef.value.style.transition = 'height 0.5s'
    }
  }
)

const handleClickInput = () => {
  popoverVisible.value = true
}
const handleClickInputOut = () => {
  popoverVisible.value = false
}

const optionsList = computed(() => {
  let options = props.options || []
  if (props.filter && inputValue.value) {
    let newOptions = options.filter((item) => item[props.labelName].match(inputValue.value))
    return newOptions
  }
  return options
})

const selectRef = ref()

const handleChose = (option: any) => {
  inputValue.value = option[props.labelName]
  value.value = option[props.valueName]
  selectRef.value.focus()

  nextTick(() => {
    popoverVisible.value = false
    selectRef.value.blur()
  })

  emits('on-change', {
    label: option[props.labelName],
    value: option[props.valueName]
  })
}

const handleInput = (val: any) => {
  value.value = val.target.value
  if (props.filter) {
    let matchItem = optionsList.value
      .filter((item) => item[props.labelName] == val.target.value)
      .pop()
    if (!matchItem) {
      emits('on-change', {
        isMatch: false,
        value: val.target.value
      })
    }
  }
}

const handleClear = () => {
  value.value = null
  inputValue.value = null
  selectRef.value.focus()
}

const handleClickArrow = () => {
  popoverVisible.value = !popoverVisible.value
}
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

.csg-select-inner {
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
  .csg-select-inner:not(:placeholder-shown),
  .csg-select-inner:focus {
    border-color: @base-color;
  }
}

.csg-input-wrap-havelabel {
  position: relative;
  width: 100%;

  .csg-select-label {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    padding: 0 30px 0 20px;
    pointer-events: none;
    color: @base-placeholder-color;
    transition: 0.5s;
  }

  .csg-select-inner:not(:placeholder-shown) ~ .csg-select-label,
  .csg-select-inner:focus ~ .csg-select-label {
    color: @base-color;
    transform: translate(21px, -50%);
    top: 0;
    padding: 0 10px;
    background-color: #fff;
    border-left: 1px solid @base-color;
    border-right: 1px solid @base-color;
  }
  .csg-select-inner:not(:placeholder-shown),
  .csg-select-inner:focus {
    border-color: @base-color;
  }
}

.fail[failcheck='true'] {
  .csg-select-inner {
    border-color: @base-danger-color !important;
  }
  .csg-select-inner ~ .csg-select-label {
    border-color: @base-danger-color !important;
    color: @base-danger-color !important;
  }
}

.csg-input[failcheck='false'] {
  .csg-select-inner {
    border-color: @base-color !important;
  }
}

.suffix-icon {
  width: 30px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;

  .suffix-inner {
    width: 30px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .arrows-icon {
    transition: all 0.5s;
    transform: rotateZ(180deg);
    cursor: pointer;
  }
}

.csg-select-inner:focus ~ .suffix-icon .arrows-icon,
.arrows-icon-up {
  transform: rotateZ(0) !important;
}

.options-wrap {
  height: 0;
  overflow: hidden;
}
</style>
