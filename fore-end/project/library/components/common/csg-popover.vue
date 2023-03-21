<template>
  <div class="csg-popover-wrap">
    <div
      class="reference"
      @mouseenter="handleMouseenter"
      @mouseleave="handleMouseleave"
      @click="handleClick"
    >
      <slot name="reference">
        <div class="placeholer">按钮</div>
      </slot>

      <div v-if="popovershow" class="pop-content">
        <slot>我是弹出层</slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
interface Props {
  trigger?: string
}

const props = withDefaults(defineProps<Props>(), {
  trigger: 'click'
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
  width: 200px;
  height: 300px;
  margin-top: 5px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  padding: 10px;
  box-shadow: 0px 1px 3px @base-box-shadow;
  z-index: 9999;
  cursor: auto;
}
</style>
