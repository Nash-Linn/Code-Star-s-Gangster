<template>
  <div class="csg-popover-wrap" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
    <div class="reference" @click="handleClick" v-click-outside="handleClickOut">
      <slot name="reference">
        <div class="placeholer">按钮</div>
      </slot>

      <div v-show="popovershow" class="pop-content">
        <div class="trigger"></div>
        <slot
          ><div :style="`width:${props.width};`">{{ props.content }}</div></slot
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
interface Props {
  trigger?: 'click' | 'hover'
  content?: string
  width?: string
}

const props = withDefaults(defineProps<Props>(), {
  trigger: 'hover',
  width: '100px'
})

const popovershow = ref(false)

const handleMouseenter = () => {
  if (props.trigger == 'hover') {
    popovershow.value = true
  }
}

const handleMouseleave = () => {
  if (props.trigger == 'hover') {
    popovershow.value = false
  }
}

const handleClick = () => {
  if (props.trigger == 'click') {
    popovershow.value = true
  }
}

const handleClickOut = () => {
  if (props.trigger == 'click' && popovershow.value) {
    popovershow.value = false
  }
}
</script>
<style lang="less" scoped>
.csg-popover-wrap {
  font-size: @base-font-size;
}
.reference {
  position: relative;

  cursor: pointer;

  .placeholer {
    padding: 5px 10px;
    background-color: #ccc;
    border-radius: @base-border-radius;
  }
}

.pop-content {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 5px;
  background-color: #fff;
  padding: @base-padding;
  box-shadow: 0px 1px 3px @base-box-shadow;
  border-radius: @base-border-radius;
  z-index: 9999;
  cursor: auto;
}

.trigger {
  width: 100%;
  height: 20px;
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
