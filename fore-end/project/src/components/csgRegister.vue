<template>
  <csg-dialog v-model="dialogVisible">
    <template #title>
      <div>注册</div>
    </template>
    <template #content>
      <div class="register-wrap">
        <csg-forms ref="formRef" :model="registerData" :rules="ruleValidate">
          <csg-form-item formId="username">
            <csg-input label="昵称" v-model="registerData.username" required />
          </csg-form-item>
          <csg-form-item formId="usercode">
            <csg-input label="账号" v-model="registerData.usercode" required />
          </csg-form-item>
          <csg-form-item formId="password">
            <csg-input label="密码" type="password" v-model="registerData.password" required />
          </csg-form-item>
          <csg-form-item formId="repassword">
            <csg-input
              label="再次输入密码"
              type="password"
              v-model="registerData.repassword"
              required
            />
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
import { create } from '@/api/user'
import { useUserStore } from '@/stores/modules/user'

const userStore = useUserStore()

const $csgMessage: any = inject('$csgMessage')

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

const validatePassword = (value: any, callback: any) => {
  if (value.length < 6 || value.length > 20) {
    callback('请输入6-20位的密码')
  } else {
    callback()
  }
}
const validateRePass = (value: any, callback: any) => {
  if (value != registerData.password) {
    callback('两次密码输入不一致,请重新输入')
  } else {
    callback()
  }
}

const ruleValidate = {
  username: [
    {
      required: true,
      message: '请填写昵称',
      trigger: 'blur'
    }
  ],
  usercode: [
    {
      required: true,
      message: '请填写账号',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请填写密码',
      trigger: 'blur'
    },
    {
      validator: validatePassword,
      trigger: 'blur'
    }
  ],
  repassword: [
    {
      required: true,
      message: '请再次填写密码',
      trigger: 'blur'
    },
    {
      validator: validateRePass,
      trigger: 'blur'
    }
  ]
}

const handleRegister = () => {
  if (!formRef.value.verify()) {
    return false
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
<style scoped lang="less">
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
