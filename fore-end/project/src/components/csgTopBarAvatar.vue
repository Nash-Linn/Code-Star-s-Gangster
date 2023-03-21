<template>
  <div>
    <csg-popover>
      <template #reference> <csg-avatar /></template>
      <div class="content">
        <div class="title">登录后可发表文章</div>
        <div class="button" @click="handleLogin">立即登录</div>
        <div class="register">点我注册</div>
      </div>
    </csg-popover>

    <teleport to="body">
      <csg-dialog v-model="loginDialogVisible">
        <template #title>
          <div>登录</div>
        </template>
        <template #content>
          <div class="csg-login-wrap"><csgLogin /></div>
        </template>
      </csg-dialog>
    </teleport>
  </div>
</template>
<script setup lang="ts">
import csgLogin from './csgLogin.vue'
import { ref } from 'vue'

const loginDialogVisible = ref<boolean>(false)

const handleLogin = () => {
  loginDialogVisible.value = true
}
</script>
<style lang="less" scoped>
.content {
  .title {
    white-space: nowrap;
    font-size: 16px;
    font-weight: bold;
  }

  .button {
    margin-top: 25px;
    width: 100%;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: @base-color;
    border-radius: @base-border-radius;
    color: #fff;
    cursor: pointer;
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
