<template>
  <span
    class="csg-tag-wrap"
    :class="[sizeStyle, hoverColor ? 'hoverStyle' : '']"
    :style="`color:${color};
             border-color:${borderColor};
             background-color:${backgroundColor};`"
  >
    <span class="content">
      <slot />
    </span>
    <i v-if="close" class="close-icon-wrap" @click="handleClose">
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
    </i>
  </span>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
interface Props {
  close?: boolean
  color?: string
  borderColor?: string
  backgroundColor?: string
  size?: string
  hoverColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  close: false,
  size: 'normal'
})

const emits = defineEmits(['on-close'])

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

const handleClose = () => {
  emits('on-close')
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
.csg-tag-wrap {
  border: 1px solid @base-color;
  border-radius: @base-border-radius;
  box-sizing: border-box;
  display: inline-flex;
  height: 32px;
  align-items: center;
  padding: 0 5px;
  cursor: pointer;
  user-select: none;
}

.hoverStyle {
  &:hover {
    background-color: v-bind(hoverColor);
  }
}

.close-icon-wrap {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition: all 1s;
}
.close-icon-wrap:hover {
  transform: rotateZ(360deg);
}
</style>
