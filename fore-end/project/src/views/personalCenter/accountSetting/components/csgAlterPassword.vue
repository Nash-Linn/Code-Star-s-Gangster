<template>
  <csg-dialog v-model="dialogVisible" title="修改密码">
    <template #content>
      <div class="register-wrap">
        <csg-forms ref="formRef" :model="alterData" :rules="ruleValidate">
          <csg-form-item formId="password">
            <csg-input label="原密码" type="password" v-model="alterData.password" required />
          </csg-form-item>
          <csg-form-item formId="newPassword">
            <csg-input label="新密码" type="password" v-model="alterData.newPassword" required />
          </csg-form-item>
          <csg-form-item formId="repassword">
            <csg-input
              label="再次输入新密码"
              type="password"
              v-model="alterData.repassword"
              required
            />
          </csg-form-item>
        </csg-forms>

        <div class="button-wrap">
          <csg-button class="login-button" @click="handleRegister">修改密码</csg-button>
        </div>
      </div>
    </template>
  </csg-dialog>
</template>
<script setup lang="ts">
import { ref, reactive, computed, inject } from 'vue'
import { encryptcode } from '@/utils/encryp'
import { alterPassword } from '@/api/user'

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

interface AlterData {
  password: string
  newPassword: string
  repassword?: string
}

const alterData = reactive<AlterData>({
  password: '',
  newPassword: '',
  repassword: ''
})

const validateRePass = (value: any, callback: any) => {
  if (value != alterData.newPassword) {
    callback('两次密码输入不一致,请重新输入')
  } else {
    callback()
  }
}

const ruleValidate = {
  password: [
    {
      required: true,
      message: '请填写原密码',
      trigger: 'blur'
    }
  ],
  newPassword: [
    {
      required: true,
      message: '请填写新密码',
      trigger: 'blur'
    }
  ],
  repassword: [
    {
      required: true,
      message: '请再次填写新密码',
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
  let createdata: AlterData = {
    password: encryptcode(alterData.password),
    newPassword: encryptcode(alterData.newPassword)
  }
  AlterPassword(createdata)
}

//创建用户

const AlterPassword = async (data: AlterData) => {
  await alterPassword(data)
    .then((res: any) => {
      if (res.code == 200) {
        $csgMessage({
          type: 'success',
          message: '修改成功！'
        })
        dialogVisible.value = false
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
