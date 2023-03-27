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
    <div class="csg-input-tip-icon">
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

const failMsg = ref()
const handleMouseoverTipIcon = () => {
  let inputdom = document.querySelector(`#${props.formId}`)
  failMsg.value = inputdom?.getAttribute('failMsg')
}
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
    padding: 0 30px 0 20px;
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
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0 30px 0 20px;

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

.csg-input-tip-icon {
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

.csg-input-inner[failcheck='true'] ~ .csg-input-tip-icon {
  display: block;
}

.csg-input-inner[failcheck='false'] ~ .csg-input-tip-icon {
  display: none;
}
</style>
