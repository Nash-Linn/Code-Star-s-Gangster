<template>
  <div class="blog-detail-wrap" :class="[showMenu ? 'show-menu' : 'no-menu']">
    <csgBlogMenu
      :show="true"
      class="blog-menu"
      :data="blogInfo.content"
      @menu-change="handleMenuChange"
    />
    <section class="blog-container">
      <header>
        <span class="title">{{ blogInfo.title }}</span>
      </header>
      <div class="creator-infos">
        <div class="avatar">
          <csg-avatar :imgurl="blogInfo.creatorAvatar" />
        </div>
        <div class="right">
          <div class="creator-name">{{ blogInfo.creatorName }}</div>
          <div class="create-time">{{ parseTime(blogInfo.createTime) }}</div>
        </div>
      </div>
      <div class="content">
        <csgRichText v-model:model-value="blogInfo.content" :toolbar="false" readonly />
      </div>
    </section>
  </div>
  <div class="fixed-button">
    <div v-if="hasMenu" class="menu-button" @click="handleMenuShow">
      <svg
        t="1684313970449"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2530"
        width="40"
        height="40"
      >
        <path
          d="M805.8 205.4v-1.1c0-13.6-11.1-24.7-24.7-24.7H264.4c-13.6 0-24.7 11.1-24.7 24.7V818.6c0 6.2 2.2 11.9 5.9 16.4 0.3 0.3 0.5 0.6 0.8 0.9 2.2 2.4 4.9 4.5 7.9 5.9 3.4 1.6 7.2 2.6 11.2 2.6H780.1c14.2 0 25.8-11.6 25.8-25.8V205.4h-0.1z m-514.6 25.8h463v561.7h-463V231.2z"
          p-id="2531"
          fill="#4ed2d2"
        ></path>
        <path
          d="M678.9 393.2H468.5c-14.2 0-25.8-11.6-25.8-25.8 0-14.2 11.6-25.8 25.8-25.8h210.3c14.2 0 25.8 11.6 25.8 25.8 0 14.2-11.6 25.8-25.7 25.8zM400.5 393.2h-42.1c-14.2 0-25.8-11.6-25.8-25.8 0-14.2 11.6-25.8 25.8-25.8h42.1c14.2 0 25.8 11.6 25.8 25.8 0 14.2-11.6 25.8-25.8 25.8zM678.9 545.4H358.4c-14.2 0-25.8-11.6-25.8-25.8 0-14.2 11.6-25.8 25.8-25.8h320.4c14.2 0 25.8 11.6 25.8 25.8 0 14.2-11.6 25.8-25.7 25.8zM678.9 693H358.4c-14.2 0-25.8-11.6-25.8-25.8 0-14.2 11.6-25.8 25.8-25.8h320.4c14.2 0 25.8 11.6 25.8 25.8 0 14.2-11.6 25.8-25.7 25.8z"
          p-id="2532"
          fill="#4ed2d2"
        ></path>
      </svg>
      <span style="user-select: none">目录</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, onBeforeMount } from 'vue'
import { getBlogDetail } from '@/api/blogsManage/blogsManage'
import { useRoute } from 'vue-router'
import csgRichText from '@/components/csgRichText.vue'
import { parseTime } from '@/utils'
import { baseURL } from '@/config'
import csgBlogMenu from '@/components/csgBlogMenu.vue'

const route = useRoute()
const blogInfo = reactive({
  title: '',
  content: '',
  createTime: '',
  creatorName: '',
  creatorAvatar: ''
})

const GetBlogDetail = async (id: string) => {
  await getBlogDetail(id).then((res) => {
    blogInfo.content = res.data.content
    blogInfo.title = res.data.title
    blogInfo.createTime = res.data.createTime
    blogInfo.creatorName = res.data.creatorName
    blogInfo.creatorAvatar = baseURL + `/users/getAvatar/${res.data.creatorAvatar}`
  })
}

onBeforeMount(() => {
  let id: string = route.params.id as string
  GetBlogDetail(id)
})

const hasMenu = ref(false)

const handleMenuChange = (val: any) => {
  if (val.length == 0) {
    hasMenu.value = false
  } else {
    hasMenu.value = true
  }
}
const manualShowMenu = ref(false)
const handleMenuShow = () => {
  manualShowMenu.value = !manualShowMenu.value
}

const showMenu = computed(() => {
  return hasMenu.value && manualShowMenu.value
})
</script>
<style lang="less" scoped>
.show-menu {
  // .blog-container {
  //   margin-left: 210px !important;
  //   width: calc(100% - 210px) !important;
  // }

  .blog-menu {
    margin-left: -210px;
    opacity: 1;
    transition: all 0.3s;
  }
}

.no-menu {
  // .blog-container {
  //   margin-left: 0 !important;
  // }

  .blog-menu {
    opacity: 0;
    margin-left: 0px;
  }
}

.blog-detail-wrap {
  position: relative;
  width: 100%;
  padding: @base-padding;
  display: flex;
  .blog-menu {
    width: 200px;
    flex-shrink: 0;
    position: fixed;
    top: calc(@top-bar-height + @base-padding);
    height: calc(@main-height - 40px);
  }

  .blog-container {
    width: 100%;
    min-height: calc(@main-height - 40px);
    // margin-left: 210px;
    padding: @base-padding;
    background-color: #fff;
    border-radius: @base-border-radius;
  }

  .title {
    font-size: @title-font-size-large;
    font-weight: bold;
  }

  .creator-infos {
    margin-top: 20px;
    border: 1px dashed @base-color-border;
    padding: 10px;
    border-radius: @base-border-radius;
    display: flex;
    align-items: center;

    .avatar {
      margin-right: 20px;
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}

.fixed-button {
  position: fixed;
  bottom: 100px;
  left: calc(50% + @base-page-width / 2);

  .menu-button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.5s;

    svg {
      display: block;
    }
    span {
      display: none;
      color: @base-color;
    }

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      svg {
        display: none;
      }
      span {
        display: block;
      }
    }
  }
}
</style>
