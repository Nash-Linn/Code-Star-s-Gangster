<template>
  <div class="login-wrap">
    <csg-form-item>
      <csg-input label="用户名" v-model="registerData.username" />
    </csg-form-item>
    <csg-form-item>
      <csg-input label="账号" v-model="registerData.usercode" />
    </csg-form-item>
    <csg-form-item>
      <csg-input label="密码" type="password" v-model="registerData.password" />
    </csg-form-item>
    <csg-form-item>
      <csg-input label="再次输入密码" type="password" v-model="registerData.repassword" />
    </csg-form-item>

    <div class="button-wrap">
      <csg-button class="login-button" @click="handleRegister"> 立即注册 </csg-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { encryptcode } from '@/utils/encryp'
import { isBlank } from '@/utils/validate'
import { create } from '@/api/user'

interface RegisterData {
  username: string
  usercode: string
  password: string
  repassword?: string
  [key: string]: any
}

const registerData = reactive<RegisterData>({
  username: '',
  usercode: '',
  password: '',
  repassword: ''
})

const verify = () => {
  let flag = true
  for (let key in registerData) {
    if (isBlank(registerData[key])) {
      flag = false
    }
  }

  if (registerData.password != registerData.repassword) {
    flag = false
  }

  return flag
}

const handleRegister = () => {
  if (!verify()) {
    return
  }

  let createdata: RegisterData = {
    username: registerData.username,
    usercode: registerData.usercode,
    password: encryptcode(registerData.password)
  }
  Create(createdata)
}

//创建用户

const Create = async (data: RegisterData) => {
  await create(data).then((res: any) => {
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
