<template>
  <csg-dialog v-model="dialogVisible">
    <template #title>
      <div>登录</div>
    </template>
    <template #content>
      <div class="login-wrap">
        <csg-form-item>
          <csg-input label="账号" v-model="loginData.usercode" />
        </csg-form-item>
        <csg-form-item>
          <csg-input
            label="密码"
            type="password"
            v-model="loginData.password"
            @keyup.enter="handleLogin"
          />
        </csg-form-item>
        <div class="button-wrap">
          <csg-button class="login-button" @click="handleLogin"> 立即登录 </csg-button>
        </div>
      </div>
    </template>
  </csg-dialog>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { isBlank } from '@/utils/validate'
import { encryptcode } from '@/utils/encryp'
import { useUserStore } from '@/stores/modules/user'
import { ref, inject, computed } from 'vue'

const $csgMessage: any = inject('$csgMessage')

const emits = defineEmits(['update:modelValue'])

const userStore = useUserStore()

interface Props {
  modelValue: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false
})

const dialogVisible = computed({
  get: () => props.modelValue || false,
  set: (val) => {
    emits('update:modelValue', val)
  }
})

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

const handleLogin = async () => {
  if (!verify()) {
    return
  }

  let data: LoginData = {
    usercode: loginData.usercode,
    password: encryptcode(loginData.password)
  }
  await userStore.login(data)
  if (userStore.getToken) {
    $csgMessage({
      type: 'success',
      message: '成功'
    })
    dialogVisible.value = false
  }
}
</script>
<style scoped lang="less">
.login-wrap {
  width: 100%;
  margin-top: 20px;
}
.button-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
