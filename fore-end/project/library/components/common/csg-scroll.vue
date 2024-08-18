<!--滚动条-->
<template>
  <div
    class="csg-scroll"
    @wheel.prevent="wheelEventHandle"
    :style="{ height: height + 'px' }"
    ref="scrollRef"
  >
    <!--滚动内容-->
    <div
      class="scroll-content"
      :id="domId"
      :style="scrollContentStyles"
      ref="scrollWrapperRef"
      v-dom-resize="handleScrollContentResize"
    >
      <slot></slot>
    </div>
    <!--滚动条-->
    <div
      v-show="showScrollBarComputed"
      :class="['scroll-bar-wrap', props.autoHide ? 'autoHide' : '']"
      :style="scrollWrapStyle"
      @mousedown.prevent.stop="clickBarWrapHandler"
    >
      <div
        ref="barRef"
        class="scroll-bar"
        :style="scrollBarStyle"
        @mousedown.prevent.stop="clickBarHandler"
      ></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, onActivated, onDeactivated } from 'vue'
import type { Ref } from 'vue'
interface Props {
  //  外框高度
  height?: number
  // 速度
  speed?: number //0-5
  //显示滚动条
  showScrollBar?: boolean
  //自动隐藏
  autoHide?: boolean
  //滚动条宽度
  barWidth?: number
  //滚动条跑道颜色
  barWrapColor?: string
  //滚动条颜色
  barColor?: string
  //圆角
  radius?: number
  //滚动条距离内容的距离
  gap?: number
  //id
  domId?: string
  //是否保存滚动条当前位置
  saveScrollTop?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  height: 100,
  speed: 0,
  showScrollBar: true,
  autoHide: true,
  barWidth: 6,
  radius: 10,
  gap: 0
})

const emits = defineEmits(['on-max', 'on-min', 'on-ready'])
// 滚动内容的高度
const domClientHeight = ref(0)
// 滚动距离
const scrollTop = ref(0)
// 滚动步进
const scrollStep = ref(0)

//dom元素
const scrollWrapperRef = ref()
const barRef = ref()
const scrollRef = ref()
//  滚动内容的样式
const scrollContentStyles = computed(() => {
  return {
    transform: `translateY(${scrollTop.value}px)`,
    paddingRight: `${props.gap}px`
  }
})
//  滚动条外框样式
const scrollWrapStyle = computed(() => {
  return {
    width: `${props.barWidth}px`,
    backgroundColor: props.barWrapColor,
    borderRadius: `${props.radius}px`
  }
})
//  滚动条样式
const scrollBarStyle = computed(() => {
  let translateYNum = (-scrollTop.value * props.height) / domClientHeight.value
  let translateY = `translateY(${translateYNum}px)`
  return {
    height: `${scrollBarHeight.value}px`,
    transform: translateY,
    msTransform: translateY,
    webkitTransform: translateY,
    backgroundColor: props.barColor,
    borderRadius: `${props.radius}px`
  }
})

//滚动条显示
const showScrollBarComputed = computed(() => {
  return domClientHeight.value > props.height && props.showScrollBar
})

//  滚动条高度
const scrollBarHeight = computed(() => {
  let barHeight = (props.height * props.height) / domClientHeight.value
  if (barHeight >= props.height) return 0
  return barHeight
})
// 最大滚动高度
const maxScrollTop = computed(() => {
  return domClientHeight.value - props.height
})

// 获取dom高度
const getDomClientHeight = (dom: Ref<HTMLElement>) => {
  domClientHeight.value = dom.value.clientHeight
  if (dom.value && domClientHeight.value === 0) {
    let event = () => {
      domClientHeight.value = dom.value.clientHeight
    }
    dom.value.addEventListener('mouseover', event)
    if (domClientHeight.value !== 0) {
      dom.value.addEventListener('mouseout', () => {
        dom.value.removeEventListener('mouseover', event)
      })
    }
  }
}

//  滚轮事件处理
const wheelEventHandle = (event: any) => {
  getDomClientHeight(scrollWrapperRef)
  if (scrollBarHeight.value === 0) return
  let { deltaY } = event
  deltaY += props.speed
  scrollStep.value = Math.abs(deltaY)
  if (deltaY > 0) prevScorllHandle()
  if (deltaY < 0) nextScorllHandle()
}

//  向上滚动
const prevScorllHandle = () => {
  let isMax = maxScrollTop.value - Math.abs(scrollTop.value) < scrollStep.value
  if (isMax) {
    scrollTop.value = -maxScrollTop.value
    emits('on-max')
  } else {
    scrollTop.value -= scrollStep.value
  }
}

//  向下滚动
const nextScorllHandle = () => {
  let isMin = Math.abs(scrollTop.value) - scrollStep.value < 0
  if (isMin) {
    scrollTop.value = 0
    emits('on-min')
  } else {
    scrollTop.value += scrollStep.value
  }
}

const yMove = ref()
//滑块点击事件
const clickBarHandler = (event: any) => {
  event.stopImmediatePropagation()
  document.addEventListener('mousemove', mouseMoveDocumentHandler, false)
  document.addEventListener('mouseup', mouseUpDocumentHandler, false)
  document.onselectstart = () => false
  let curTarget = event.currentTarget
  //curTarget.offsetHeight 元素高度
  //event.clientY 鼠标相对于浏览器的位置
  //getBoundingClientRect方法 返回元素的大小及其相对于视口的位置
  yMove.value = curTarget.offsetHeight - (event.clientY - curTarget.getBoundingClientRect().top)
}
//  鼠标移动事件
const mouseMoveDocumentHandler = (event: any) => {
  let prevPage = yMove.value
  if (!prevPage) return
  let thumbClickPosition = barRef.value.offsetHeight - prevPage
  barMoveHandle(event, scrollRef.value, thumbClickPosition)
}
//  鼠标抬起来的事件
const mouseUpDocumentHandler = () => {
  yMove.value = 0
  document.removeEventListener('mousemove', mouseMoveDocumentHandler)
  document.onselectstart = null
}
//滑块外框事件
const clickBarWrapHandler = (event: any) => {
  let thumbHalf = barRef.value.offsetHeight / 2
  barMoveHandle(event, event.target, thumbHalf)
}
//滑块移动处理
const barMoveHandle = (event: any, dom: any, position: any) => {
  let offset = Math.abs(dom.getBoundingClientRect()['top'] - event.clientY)
  let thumbPositionPercentage = (offset - position) / dom.offsetHeight
  let _scrollTop = -(thumbPositionPercentage * domClientHeight.value)
  if (-_scrollTop >= maxScrollTop.value) {
    emits('on-max')
    scrollTop.value = -maxScrollTop.value
    return
  } else if (_scrollTop >= 0) {
    emits('on-min')
    scrollTop.value = 0
    return
  }
  scrollTop.value = _scrollTop
}
//  如果有iframe 也需要处理
const iframeDocumentHandle = () => {
  let iframe = document.getElementsByTagName('iframe')
  if (iframe) {
    for (let i = 0; i < iframe.length; i++) {
      // 获取 iframe 的 document 可能会产生报错 无法获取
      try {
        let iframeDocument = iframe[i].contentWindow?.document
        iframeDocument?.addEventListener('mouseup', mouseUpDocumentHandler, false)
      } catch (error) {
        //
      }
    }
  }
}

interface Resize {
  width: number
  height: number
}

const handleScrollContentResize = ({ width, height }: Resize) => {
  if (height < props.height) {
    //将滚动条置顶
    scrollTop.value = 0
  }
}

// 保存滚动条当前位置
const saveScrollTop = ref()

const onload = () => {
  getDomClientHeight(scrollWrapperRef)
  iframeDocumentHandle()
  emits('on-ready')
}

onUnmounted(() => {
  document.removeEventListener('mouseup', mouseUpDocumentHandler)
})

onMounted(() => {
  onload()
})

onActivated(() => {
  onload()

  if (props.saveScrollTop) {
    scrollTop.value = saveScrollTop.value
  }
})

onDeactivated(() => {
  document.removeEventListener('mouseup', mouseUpDocumentHandler)
  saveScrollTop.value = scrollTop.value
})
</script>
<style lang="less" scoped>
.csg-scroll {
  width: 100%;
  overflow: hidden;
  position: relative;
  &:hover .autoHide {
    opacity: 1 !important;
  }
  .autoHide {
    opacity: 0 !important;
    transition: all 200ms;
  }
  .scroll-bar-wrap {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    background-color: @base-color-3;
    overflow: hidden;
    cursor: pointer;
    .scroll-bar {
      width: 100%;
      cursor: pointer;
      background-color: @base-color;
    }
  }
}
</style>
