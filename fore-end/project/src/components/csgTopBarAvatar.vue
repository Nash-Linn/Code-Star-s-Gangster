<template>
  <div>
    <csg-popover>
      <template #reference> <csg-avatar :imgurl="avatar" /></template>
      <div class="content">
        <div class="title">登录后可发表文章</div>
        <!-- <div class="button" @click="handleLogin">立即登录</div> -->
        <div class="buttons">
          <csg-button size="small" class="button" @click="handleLogin">立即登录</csg-button>
          <div class="register" @click="handleRegister">点我注册</div>
        </div>
      </div>
    </csg-popover>

    <teleport to="body">
      <csg-dialog v-model="loginDialogVisible">
        <template #title>
          <div>登录</div>
        </template>
        <template #content>
          <div class="csg-login-wrap"><csgLogin @success="hanleLoginSuccess" /></div>
        </template>
      </csg-dialog>

      <csg-dialog v-model="registerDialogVisible">
        <template #title>
          <div>注册</div>
        </template>
        <template #content>
          <div class="csg-login-wrap"><csgRegister /></div>
        </template>
      </csg-dialog>
    </teleport>
  </div>
</template>
<script setup lang="ts">
import csgLogin from './csgLogin.vue'
import csgRegister from './csgRegister.vue'
import { useUserStore } from '@/stores/modules/user'
import { ref, reactive, computed } from 'vue'
const userStore = useUserStore()
const loginDialogVisible = ref<boolean>(false)

const handleLogin = () => {
  loginDialogVisible.value = true
}

const registerDialogVisible = ref<boolean>(false)

const handleRegister = () => {
  registerDialogVisible.value = true
}

const hanleLoginSuccess = () => {
  loginDialogVisible.value = false
}

const userInfo = reactive({
  username: userStore.getUsername,
  avatar: userStore.getUsername
})

const avatar = computed(() => {
  if (userStore.getToken && !userInfo.avatar) {
    return 'src/assets/avatar/avatar.png'
  }
  return userInfo.avatar
})
</script>
<style lang="less" scoped>
.content {
  .title {
    white-space: nowrap;
    font-size: 16px;
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

.csg-login-wrap {
  margin-top: 20px;
}
</style>
