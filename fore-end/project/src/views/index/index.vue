<template>
  <div class="index-wrap">
    <div class="background"></div>
    <div class="index-content">
      <h1 class="index-title">Code Star's Gangster</h1>
      <div class="introduce">
        <span class="text"></span>
      </div>
      <div class="gotoBlog" @click="goToBlog">
        <div class="arrow"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function dealTitleStyle(selector: string) {
  const overlap = document.querySelector(selector)! as HTMLElement
  if (!overlap) return
  const txt = overlap.textContent
  overlap.innerHTML = txt
    ?.split('')
    .map((item, i) => `<span style="z-index:${txt.length - i}" >${item}</span>`)
    .join('')!
}

function typeText(selector: string, words: string, delay: number) {
  var container = document.querySelector(selector)!
  if (!container) return
  var index = 0
  container.textContent = ''
  var interval = setInterval(function () {
    if (index < words.length) {
      container.textContent += words[index++]
    } else {
      clearInterval(interval)
    }
  }, delay)
}

//监听鼠标滚动事件
function scrollEvent(event: WheelEvent) {
  //判断往下滚动
  if (event?.deltaY > 0) {
    goToBlog()
  }
}

function goToBlog() {
  const timeout = 1000
  //跳转页面前 将元素 index-content 向上淡出 最后再跳转
  const indexContent = document.querySelector('.index-content')! as HTMLElement
  indexContent.style.opacity = '0'
  indexContent.style.top = '-100vh'

  indexContent.style.transition = `all ${timeout / 1000}s ease`
  setTimeout(() => {
    router.push('/blog')
  }, timeout / 2)
}

onMounted(() => {
  const indexContent = document.querySelector('.index-content')! as HTMLElement
  indexContent.style.opacity = '1'
  indexContent.style.top = '0'

  dealTitleStyle('.index-title')
  typeText(
    '.introduce .text',
    `
     Hello! I'm Nash, a front-end developer.
     Welcome to my personal blog.
     I hope you can learn something here.`,
    50
  )
  window.addEventListener('wheel', scrollEvent)
})

onUnmounted(() => {
  window.removeEventListener('wheel', scrollEvent)
})
</script>
<style scoped lang="less">
.index-wrap {
  @background-color: rgba(0, 0, 0, 0.5);
  @title-font-size: 150px;
  @title-top: 40px;

  position: relative;
  .background {
    position: fixed;
    top: @top-bar-height;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-color: @background-color;
    filter: blur(30px);
    -webkit-filter: blur(30px);
  }
  .index-content {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    opacity: 1;
  }

  .index-title {
    position: relative;
    top: @title-top;
    text-align: center;
    font-family: 'Helvetica';
    letter-spacing: -20px;
    font-size: @title-font-size;
    color: #fff;
    animation: move 2s;
    cursor: default;
    user-select: none;

    &,
    span {
      position: relative;
      text-shadow: -10px 0 10px #000;
    }
  }

  .introduce {
    position: absolute;
    top: calc(@title-top + @title-font-size + 20px);
    left: 50%;
    transform: translateX(-50%);
    font-size: 50px;
    color: @base-color;
    width: 100%;
    max-width: @base-page-width;
    display: flex;
    justify-content: center;
    cursor: default;
    user-select: none;
    .text {
      display: inline-block;
      white-space: pre-wrap;
    }

    /* 光标 */
    /* 在文本内容的最后通过添加行内元素以达到光标跟随文字的输入移动的效果 */
    .text::after {
      content: '|';
      animation: writing 0.6s infinite;
    }

    /* 光标动画 */
    @keyframes writing {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }

  .gotoBlog {
    position: absolute;
    top: calc(@title-top + @title-font-size + 20px + 400px);
    left: 50%;
    .arrow {
      position: relative;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 2px solid @base-color-2;
      cursor: pointer;
      &::after {
        display: block;
        content: '';
        width: 0;
        height: 0;
        border-top: 20px solid transparent;
        border-bottom: 20px solid transparent;
        border-left: 40px solid @base-color-2; /* 设置箭头颜色 */
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(calc(-50% + 5px), -50%);
      }

      &:hover {
        border-color: @base-color;
        transition: all 0.5s;

        &::after {
          border-left-color: @base-color;
          transition: all 0.5s;
        }
      }
    }
  }
}

//从下方往上飘入
@keyframes move {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
