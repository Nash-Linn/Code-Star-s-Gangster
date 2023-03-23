<template>
  <div class="login-wrap">
    <csg-form-item>
      <csg-input label="账号" v-model="loginData.usercode" />
    </csg-form-item>
    <csg-form-item>
      <csg-input label="密码" type="password" v-model="loginData.password" />
    </csg-form-item>

    <div class="button-wrap">
      <csg-button class="login-button" @click="handleLogin"> 立即登录 </csg-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { isBlank } from '@/utils/validate'
import { login } from '@api/user'
import { encryptcode } from '@/utils/encryp'

interface LoginData {
  usercode: string
  password: string
  [key: string]: any
}

const loginData = reactive<LoginData>({
  usercode: '',
  password: ''
})

const verify = () => {
  let flag = true
  for (let key in loginData) {
    if (isBlank(loginData[key])) {
      flag = false
    }
  }

  return flag
}

const handleLogin = () => {
  if (!verify()) {
    return
  }

  let data: LoginData = {
    usercode: loginData.usercode,
    password: encryptcode(loginData.password)
  }
  Login(data)
}

//登录
const Login = async (data: LoginData) => {
  await login(data).then((res: any) => {
    if (res.code == 200) {
      console.log('成功')
    }
  })
}
</script>
<style scope lang="less">
.login-wrap {
  width: 100%;
}
.button-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
