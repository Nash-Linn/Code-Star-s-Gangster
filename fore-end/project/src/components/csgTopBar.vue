<template>
  <div class="topbar">
    <div class="topbar-content">
      <div class="left">
        <div class="logo" @click="handleClickLogo">
          <img src="@/assets/avatar/avatar.png" alt="" />
          <div class="logo-title">
            <div>CSG</div>
            <div class="des">Code Star's Gangster</div>
          </div>
        </div>
        <router-link class="left-item" to="/">博客</router-link>
        <router-link class="left-item" to="/about">关于</router-link>
      </div>
      <div class="center">
        <csgTopSearch />
      </div>
      <div class="right">
        <csgTopBarAvatar />
        <csg-button v-if="isOnlne" class="public" @click="goToPublishBlog">发布</csg-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import csgTopSearch from './csgTopSearch.vue'
import csgTopBarAvatar from './csgTopBarAvatar.vue'
import { useUserStore } from '@/stores/modules/user'
import { useCommonStore } from '@/stores/modules/common'
const $pub = inject('$pub')
const $unsub = inject('$unsub')

const userStore = useUserStore()

const router = useRouter()

const isOnlne = computed(() => {
  return userStore.getToken ? true : false
})

//获取当前路由
const currentRoute = computed(() => {
  return router.currentRoute.value.path
})

const goToPublishBlog = () => {
  if (currentRoute.value == '/publishBlog') {
    $pub('publishBlog')
  } else {
    $unsub('publishBlog')
    router.push('/publishBlog')
  }
}

const commonStore = useCommonStore()
const handleClickLogo = () => {
  commonStore.addLogoClickCount()
  if (commonStore.getLogoClickCount == 0) {
    router.push('/gameCenter/dinoDemo')
  }
}
</script>
<style scoped lang="less">
.topbar {
  width: 100%;
  height: @top-bar-height;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  user-select: none;
  .topbar-content {
    height: 100%;
    width: @base-page-width;
    margin: 0 auto;
    display: flex;
    padding: 0 @base-padding;

    align-items: center;
    .left {
      width: 300px;
      display: flex;
      flex-shrink: 0;
      align-items: center;

      .logo {
        height: 40px;
        border-radius: @base-border-radius;
        overflow: hidden;
        margin-right: 20px;
        background-color: @base-color;
        cursor: pointer;
        display: flex;
        align-items: center;
        .logo-title {
          font-size: 20px;
          font-weight: bold;
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 10px;
          .des {
            font-size: 12px;
            font-weight: normal;
          }
        }
        img {
          height: 100%;
        }
      }
      .left-item {
        display: block;
        height: 100%;
        cursor: pointer;
        margin-right: 20px;
      }

      .router-link-active.router-link-exact-active.left-item {
        color: @base-color;
      }
    }

    .center {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
    }

    .right {
      flex-shrink: 0;
      width: 300px;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .public {
        margin-left: 20px;
      }
    }
  }
}
</style>
