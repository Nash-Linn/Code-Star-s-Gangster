<template>
  <div class="csg-popover-wrap" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
    <div class="reference" @click="handleClick" v-click-outside="handleClickOut">
      <slot name="reference">
        <div class="placeholer">按钮</div>
      </slot>
      <div
        v-show="props.visible || popovershow"
        class="pop-content"
        :style="`padding:${props.padding}`"
      >
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
  //手动控制可见
  visible: boolean
  //触发方法
  trigger: 'click' | 'hover'
  //显示内容
  content?: string
  //弹出宽度
  width?: string
  //内容区padding
  padding?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '100px',
  padding: '20px',
  visible: false
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
  box-shadow: @base-box-shadow;
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
