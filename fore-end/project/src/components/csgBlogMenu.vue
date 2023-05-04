<template>
  <div ref="indexWrapRef" class="blog-menu">
    <div ref="titleRef" class="title">目录</div>
    <csg-scroll :height="scrollHeight">
      <div
        class="menu-item"
        v-for="(item, index) in menuList"
        :key="item.id"
        v-text="item.title"
        :style="`margin-left:${item.level * 14}px;`"
        @click="scrollToEle(item, index)"
      />
    </csg-scroll>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed } from 'vue'

interface Prop {
  data: string
  height?: number
}
const props = defineProps<Prop>()

const menuList = ref()
const handlerMenu = () => {
  let content = document.querySelector('.csg-rich-text-wrap') as HTMLElement
  if (!content) return
  let els = content.querySelectorAll('h1,h2,h3,h4,h5,h6')
  let menus: any = []
  if (els) {
    els.forEach((item: any, index) => {
      let menu: any = {}
      menu.isActive = null
      // 增加一个id标识
      menu.title = item.innerText
      menu.scrollTop = item.offsetTop
      let level = item.tagName.toLowerCase().replace('h', '')
      menu.level = parseInt(level) - 1
      item.setAttribute('id', `menus_${index + 1}`)
      menu.id = `#menus_${index + 1}`
      menus.push(menu)
    })
  }
  menuList.value = menus
  listenScroll()
}
// 监听目录导航，设置选中时的样式
const listenScroll = () => {
  window.addEventListener('scroll', () => {
    if (menuList.value) {
      menuList.value.forEach((item: any, index: any, list: any) => {
        let scrollTop = (document.documentElement.scrollTop || document.body.scrollTop) + 2
        if (index == 0 && scrollTop >= item.scrollTop && scrollTop < list[index + 1].scrollTop) {
          item.isActive = true
        } else if (
          index > 0 &&
          index < list.length - 1 &&
          scrollTop >= item.scrollTop &&
          scrollTop < list[index + 1].scrollTop
        ) {
          item.isActive = true
        } else if (index === list.length - 1 && scrollTop >= item.scrollTop) {
          item.isActive = true
        } else {
          item.isActive = false
        }
      })
    }
  })
}
const currentMenu = ref()
const scrollToEle = (item: any, index: any) => {
  currentMenu.value = index
  window.scrollTo(0, item.scrollTop - 100)
}

watch(
  () => props.data,
  () => {
    handlerMenu()
  }
)

const indexWrapRef = ref()
const titleRef = ref()
const scrollHeight = computed(() => {
  let wrapHeight = indexWrapRef.value ? indexWrapRef.value?.clientHeight : 0
  let titleHeight = titleRef.value ? titleRef.value?.clientHeight : 0
  const padding = 20
  if (props.height) {
    return props.height - titleHeight - 2 * padding
  }
  return wrapHeight - titleHeight - 2 * padding
})
</script>
<style lang="less" scoped>
.blog-menu {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: @base-border-radius;
  padding: @base-padding;
}
.title {
  font-size: @title-font-size;
  font-weight: bold;
}
.menu-item {
  margin: 10px 0;
  color: @base-color;
  cursor: pointer;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
