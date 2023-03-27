<template>
  <div class="csg-top-bar-avatar-wrap">
    <csg-popover>
      <template #reference> <csg-avatar :imgurl="avatar" /></template>
      <div class="content">
        <template v-if="loging">
          <div class="login-wrap">
            <div class="name">{{ userStore.getUsername }}</div>
            <div class="divide-line"></div>
            <div class="routers">
              <csg-menu>
                <csg-menu-item to="/personalCenter" :actived="false">个人中心</csg-menu-item>
              </csg-menu>
            </div>
            <div class="logout-button">
              <csg-button size="small" class="button" @click="handleLogout">退出登录</csg-button>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="unlogin-wrap">
            <div class="title">登录后可发表文章</div>
            <div class="buttons">
              <csg-button size="small" class="button" @click="handleLogin">立即登录</csg-button>
              <div class="register" @click="handleRegister">点我注册</div>
            </div>
          </div>
        </template>
      </div>
    </csg-popover>

    <teleport to="body">
      <csgLogin v-model="loginDialogVisible" />
      <csgRegister v-model="registerDialogVisible" />
    </teleport>
  </div>
</template>
<script setup lang="ts">
import csgLogin from './csgLogin.vue'
import csgRegister from './csgRegister.vue'
import { useUserStore } from '@/stores/modules/user'
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = useUserStore()
const loginDialogVisible = ref<boolean>(false)

const handleLogin = () => {
  loginDialogVisible.value = true
}

const registerDialogVisible = ref<boolean>(false)

const handleRegister = () => {
  registerDialogVisible.value = true
}

const userInfo = reactive({
  username: userStore.getUsername,
  avatar: userStore.getAvatar
})

const avatar = computed(() => {
  if (!userStore.getToken) {
    return ''
  }
  return userInfo.avatar
})

const loging = computed(() => {
  if (userStore.getToken) {
    return true
  } else {
    return false
  }
})

const handleLogout = () => {
  userStore.logout()
  router.push('/')
}
</script>
<style lang="less" scoped>
.content {
  width: 200px;
  .unlogin-wrap {
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .title {
      font-size: @title-font-size;
      font-weight: bold;
    }
    .buttons {
      margin-top: 25px;
      display: flex;
      flex-direction: column;
    }
    .register {
      margin-top: 5px;
      width: 100%;
      text-align: center;
      color: @base-color;
      cursor: pointer;
    }
  }

  .login-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .name {
      font-size: @title-font-size;
      font-weight: bold;
      padding: 0 20px;
      text-align: center;
    }

    .routers {
      padding: 0 20px;
      margin-top: 15px;
    }

    .logout-button {
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }
  }
}

.csg-login-wrap {
  margin-top: 20px;
}

.csg-top-bar-avatar-wrap {
  :deep(.pop-content) {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
}
</style>
