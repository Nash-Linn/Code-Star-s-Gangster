<template>
  <div
    v-if="dialogVisible"
    class="csg-dialog-wrap"
    :class="[!props.mask ? 'no-mask' : '']"
    :style="`background-color:${props.maskColor};`"
    @click.self="handleClose"
  >
    <div class="csg-dialog" :style="`width:${props.width};`">
      <header class="csg-dialog-header">
        <slot name="title">
          <div>{{ props.title }}</div></slot
        >
        <div class="close-icon-wrap" @click="handleClose">
          <svg
            t="1679403874195"
            class="close-icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1592"
            width="20"
            height="20"
          >
            <path
              d="M306.816 306.816a27.818667 27.818667 0 0 1 39.338667 0L512 472.661333l165.845333-165.845333a27.818667 27.818667 0 1 1 39.338667 39.338667L551.338667 512l165.845333 165.845333a27.818667 27.818667 0 1 1-39.338667 39.338667L512 551.338667 346.154667 717.226667a27.818667 27.818667 0 1 1-39.338667-39.338667L472.661333 512 306.773333 346.154667a27.818667 27.818667 0 0 1 0-39.338667z"
              fill="#666666"
              p-id="1593"
            ></path>
          </svg>
        </div>
      </header>
      <div class="csg-dialog-content">
        <slot name="content"></slot>
      </div>
      <div v-if="props.footer" class="csg-dialog-footer">
        <csg-button class="cancel-button" type="danger" @click="handleCancel">取消</csg-button>
        <csg-button @click="handleConfirm">确定</csg-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: boolean
  title?: string
  width?: string
  footer?: boolean
  mask?: boolean
  maskColor?: string
}

const emits = defineEmits(['update:modelValue', 'on-cancel', 'on-confirm'])

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: '标题',
  footer: false,
  mask: false,
  maskColor: 'rgba(0, 0, 0, 0.5)'
})

const dialogVisible = computed({
  get: () => props.modelValue || false,
  set: (val) => {
    emits('update:modelValue', val)
  }
})

const handleClose = () => {
  dialogVisible.value = false
}

const handleCancel = () => {
  dialogVisible.value = false
  emits('on-cancel')
}
const handleConfirm = () => {
  emits('on-confirm')
}
</script>

<style lang="less" scoped>
.csg-dialog-wrap {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
}

.no-mask {
  background-color: transparent !important;
}

.csg-dialog {
  position: absolute;
  z-index: 9999;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: @base-box-shadow;
  border-radius: @base-border-radius;
  padding: @base-padding;
  width: 400px;

  .csg-dialog-header {
    font-size: 20px;
    font-weight: bold;

    position: relative;

    .close-icon-wrap {
      position: absolute;
      top: -5px;
      right: -5px;
      cursor: pointer;
      width: 20px;
      height: 20px;
      transition: all 1s;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    .close-icon-wrap:hover {
      transform: rotateZ(360deg);
    }
  }

  .csg-dialog-content {
    width: 100%;
  }
  .csg-dialog-footer {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .cancel-button {
      margin-right: 20px;
    }
  }
}
</style>
