<!--滚动条-->
<template>
  <div
    class="v-scroll-bar"
    @wheel.prevent="wheelEventHandle"
    :style="{ height: height + 'px' }"
    ref="jScroll"
  >
    <!--滚动内容-->
    <div class="scroll-content" :id="domId" :style="scrollContentStyles" ref="JScrollWrapper">
      <slot></slot>
    </div>
    <!--滚动条-->
    <div
      :class="['scroll-bar-wrap', autoHide ? 'autoHide' : '']"
      :style="scrollWrapStyle"
      @mousedown.prevent.stop="clickBarWrapHandler"
    >
      <div
        ref="bar"
        class="scroll-bar"
        :style="scrollBarStyle"
        @mousedown.prevent.stop="clickBarHandler"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'csg-scroll',
  props: {
    //  外框高度
    height: { type: Number, default: 100, required: true },
    // 速度
    speed: {
      validator(value) {
        return value <= 5 && value >= 0
      },
      default: 0
    },
    //自动隐藏
    autoHide: { type: Boolean, default: true },
    //滚动条宽度
    barWidth: { type: Number, default: 6 },
    //滚动条跑道颜色
    barWrapColor: { type: String, default: 'transparent' },
    //滚动条颜色
    barColor: { type: String, default: 'rgba(0,0,0,.6)' },
    //圆角
    radius: { type: Number, default: 10 },
    //滚动条距离内容的距离
    gap: { type: Number, default: 0 },
    // id
    domId: String // 标识，以防一个页面出现多个组件引用此组件
  },
  data() {
    return {
      // 滚动内容的高度
      domClientHeight: 0,
      //  滚动距离
      scrollTop: 0,
      dom: null
    }
  },
  computed: {
    //  滚动内容的样式
    scrollContentStyles() {
      return {
        transform: `translateY(${this.scrollTop}px)`,
        paddingRight: `${this.gap}px`
      }
    },
    //  滚动条外框样式
    scrollWrapStyle() {
      return {
        width: `${this.barWidth}px`,
        backgroundColor: this.barWrapColor,
        borderRadius: `${this.radius}px`
      }
    },
    //  滚动条样式
    scrollBarStyle() {
      this.translateY = (-this.scrollTop * this.height) / this.domClientHeight
      let translateY = `translateY(${this.translateY}px)`
      return {
        height: `${this.scrollBarHeight}px`,
        transform: translateY,
        msTransform: translateY,
        webkitTransform: translateY,
        backgroundColor: this.barColor,
        borderRadius: `${this.radius}px`
      }
    },
    //  滚动条高度
    scrollBarHeight() {
      let barHeight = (this.height * this.height) / this.domClientHeight
      if (barHeight >= this.height) return 0
      return barHeight
    },
    // 最大滚动高度
    maxScrollTop() {
      return this.domClientHeight - this.height
    }
  },
  methods: {
    //  滚轮事件处理
    wheelEventHandle(event) {
      if (!this.dom) {
        this.dom = this.$refs.JScrollWrapper
        this.getDomClientHeight()
      }
      if (this.scrollBarHeight === 0) return
      let { deltaY } = event
      let isFirefox = this.$_lib?.navigatorIs('firefox')
      deltaY += this.speed
      this.scrollStep = isFirefox ? Math.abs(deltaY * 4) : Math.abs(deltaY)
      if (deltaY > 0) this.prevScorllHandle()
      if (deltaY < 0) this.nextScorllHandle()
    },
    //  向上滚动
    prevScorllHandle() {
      let isMax = this.maxScrollTop - Math.abs(this.scrollTop) > this.scrollStep
      if (isMax) {
        this.scrollTop -= this.scrollStep
        this.$emit('max')
      } else {
        this.scrollTop = -this.maxScrollTop
      }
    },
    //  向下滚动
    nextScorllHandle() {
      let isMin = Math.abs(this.scrollTop) - this.scrollStep > 0
      if (isMin) {
        this.scrollTop += this.scrollStep
        this.$emit('min')
      } else {
        this.scrollTop = 0
      }
    },
    //滑块点击事件
    clickBarHandler(event) {
      event.stopImmediatePropagation()
      document.addEventListener('mousemove', this.mouseMoveDocumentHandler, false)
      document.addEventListener('mouseup', this.mouseUpDocumentHandler, false)
      document.onselectstart = () => false
      let ctt = event.currentTarget
      this.yMove = ctt.offsetHeight - (event.clientY - ctt.getBoundingClientRect().top)
    },
    //  鼠标移动事件
    mouseMoveDocumentHandler(event) {
      let prevPage = this.yMove
      if (!prevPage) return
      let thumbClickPosition = this.$refs['bar'].offsetHeight - prevPage
      console.log('this.$el', this.$el)
      this.barMoveHandle(event, this.$el, thumbClickPosition)
    },
    //  鼠标抬起来的事件
    mouseUpDocumentHandler() {
      this.yMove = 0
      document.removeEventListener('mousemove', this.mouseMoveDocumentHandler)
      document.onselectstart = null
    },
    //滑块外框事件
    clickBarWrapHandler(event) {
      let thumbHalf = this.$refs['bar'].offsetHeight / 2
      this.barMoveHandle(event, event.target, thumbHalf)
    },
    //  滑块移动处理
    barMoveHandle(event, dom, position) {
      let offset = Math.abs(dom.getBoundingClientRect()['top'] - event.clientY)
      let thumbPositionPercentage = ((offset - position) * 100) / this.$el.offsetHeight
      let scrollTop = -((thumbPositionPercentage * this.domClientHeight) / 100)
      if (-scrollTop >= this.maxScrollTop) {
        this.$emit('max')
        return (this.scrollTop = -this.maxScrollTop)
      } else if (scrollTop >= 0) {
        this.$emit('min')
        return (this.scrollTop = 0)
      }
      this.scrollTop = scrollTop
    },
    //  如果有iframe 也需要处理
    iframeDocumentHandle() {
      let iframe = document.getElementsByTagName('iframe')
      if (iframe) {
        for (let i = 0; i < iframe.length; i++) {
          let iframeDocument = iframe[i].contentWindow.document
          iframeDocument.addEventListener('mouseup', this.mouseUpDocumentHandler, false)
        }
      }
    },
    // 获取dom高度
    getDomClientHeight() {
      this.domClientHeight = this.dom.clientHeight
      if (this.dom && this.domClientHeight === 0) {
        let event = () => {
          this.domClientHeight = this.dom.clientHeight
        }
        this.dom.addEventListener('mouseover', event)
        if (this.domClientHeight !== 0) {
          this.dom.addEventListener('mouseout', () => {
            this.dom.removeEventListener('mouseover', event)
          })
        }
      }
    }
  },
  unmounted() {
    document.removeEventListener('mouseup', this.mouseUpDocumentHandler)
  },
  mounted() {
    this.$emit('scrollReady', () => {
      // if (this.domId) {
      this.iframeDocumentHandle()
      // this.dom = document.getElementById(this.domId);
      this.dom = this.$refs.JScrollWrapper
      this.getDomClientHeight()
      // }
    })
  }
}
</script>
<style lang="less" scoped>
.v-scroll-bar {
  width: 100%;
  overflow: hidden;
  position: relative;
  &:hover .autoHide {
    opacity: 1;
  }
  .autoHide {
    opacity: 0;
    transition: all 200ms;
  }
  .scroll-bar-wrap {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    overflow: hidden;
    cursor: pointer;
    .scroll-bar {
      width: 100%;
      cursor: ns-resize;
    }
  }
}
</style>
