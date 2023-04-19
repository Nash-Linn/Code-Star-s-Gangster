<template>
  <div :class="inputStyle">
    <div class="csg-textarea" :class="props.formId">
      <textarea
        :id="props.formId"
        class="csg-textarea-inner"
        v-model="value"
        placeholder=" "
        :rows="props.rows"
      />
      <span v-if="props.label" class="csg-textarea-label">{{ props.label }}</span>
    </div>

    <div class="csg-textarea-tip-icon">
      <csg-popover>
        <template #reference>
          <div class="tip-icon-wrap" @mouseover="handleMouseoverTipIcon">
            <svg
              t="1679649980444"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2200"
              width="20"
              height="20"
            >
              <path
                d="M512 64c126.677333 3.328 232.192 47.146667 316.501333 131.498667C912.853333 279.808 956.672 385.28 960 512c-3.328 126.677333-47.146667 232.192-131.498667 316.501333C744.192 912.853333 638.72 956.672 512 960c-126.677333-3.328-232.192-47.146667-316.501333-131.498667C111.146667 744.192 67.328 638.72 64 512c3.328-126.677333 47.146667-232.192 131.498667-316.501333C279.808 111.146667 385.28 67.328 512 64zM512 256c-17.322667 0-31.658667 6.357333-43.008 19.029333A58.197333 58.197333 0 0 0 453.973333 320l23.04 256a35.925333 35.925333 0 0 0 11.477334 22.485333 34.048 34.048 0 0 0 23.466666 8.533334 33.664 33.664 0 0 0 23.466667-8.533334 36.181333 36.181333 0 0 0 11.52-22.485333l23.04-256a57.984 57.984 0 0 0-15.018667-44.970667A55.381333 55.381333 0 0 0 511.914667 256H512z m0 512c14.677333-0.64 26.88-5.674667 36.522667-15.018667 9.642667-9.344 14.506667-21.333333 14.506666-35.968A49.578667 49.578667 0 0 0 512 665.984a49.450667 49.450667 0 0 0-50.986667 51.029333c0 14.677333 4.821333 26.666667 14.506667 35.968 9.642667 9.301333 21.802667 14.293333 36.48 15.018667z"
                fill="#e0620d"
                p-id="2201"
                data-spm-anchor-id="a313x.7781069.0.i4"
                class=""
              ></path>
            </svg>
          </div>
        </template>
        <div class="tip-content">
          <div>
            {{ failMsg }}
          </div>
        </div>
      </csg-popover>
    </div>
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
.csg-textarea {
  width: 100%;
  height: 100%;
  position: relative;
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

.csg-textarea-tip-icon {
  display: none;
  width: 20px;
  height: 20px;
  position: absolute;
  top: calc(50% - 10px);
  right: 5px;
}

.tip-content {
  display: flex;
  width: 100px;
  color: @base-danger-color;
}

.csg-textarea[failcheck='true'] ~ .csg-textarea-tip-icon {
  display: block;
}

.csg-textarea[failcheck='false'] ~ .csg-textarea-tip-icon {
  display: none;
}
</style>
