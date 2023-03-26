<template>
  <csg-dialog v-model="dialogVisible">
    <template #title>
      <div>注册</div>
    </template>
    <template #content>
      <div class="register-wrap">
        <csg-forms ref="formRef" :model="registerData" :rules="ruleValidate">
          <csg-form-item>
            <csg-input formId="username" label="用户名" v-model="registerData.username" />
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
        </csg-forms>

        <div class="button-wrap">
          <csg-button class="login-button" @click="handleRegister"> 立即注册 </csg-button>
        </div>
      </div>
    </template>
  </csg-dialog>
</template>
<script setup lang="ts">
import { ref, reactive, computed, inject } from 'vue'
import { encryptcode } from '@/utils/encryp'
import { isBlank } from '@/utils/validate'
import { create } from '@/api/user'
import { useUserStore } from '@/stores/modules/user'

const userStore = useUserStore()

const $csgMessage = inject('$csgMessage') as Function

const emits = defineEmits(['update:modelValue'])

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

const formRef = ref()

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

const ruleValidate = {
  username: [
    {
      required: true,
      message: '请填写用户名',
      trigger: 'blur'
    }
  ]
}

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
  // if (!verify()) {
  //   return
  // }
  formRef.value.verify()

  let createdata: RegisterData = {
    username: registerData.username,
    usercode: registerData.usercode,
    password: encryptcode(registerData.password)
  }
  // Create(createdata)
}

//创建用户

const Create = async (data: RegisterData) => {
  await create(data)
    .then((res: any) => {
      if (res.code == 200) {
        $csgMessage({
          type: 'success',
          message: '注册成功！'
        })
        dialogVisible.value = false

        userStore.login({
          usercode: registerData.usercode,
          password: encryptcode(registerData.password)
        })
      }
    })
    .catch((err) => {
      $csgMessage({
        type: 'danger',
        message: err.msg
      })
    })
}
</script>
<style scope lang="less">
.register-wrap {
  margin-top: 20px;
  width: 100%;
}
.button-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
