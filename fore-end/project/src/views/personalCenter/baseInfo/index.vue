<template>
  <div class="base-info-wrap">
    <div class="avatar-wrap">
      <userAvatar />
    </div>
    <div class="divide-line"></div>
    <csg-card class="info-card">
      <div class="infos">
        <div class="info-item">
          <div class="label">账号</div>
          <div class="value">{{ baseInfo.usercode }}</div>
        </div>

        <template v-if="isEdit">
          <csg-forms ref="formRef" :model="baseInfo" :rules="ruleValidate">
            <csg-form-item label="账号">
              <csg-input formId="username" v-model="baseInfo.username" required />
            </csg-form-item>
            <csg-form-item label="简介">
              <csg-textarea v-model="baseInfo.intro" />
            </csg-form-item>
          </csg-forms>
        </template>
        <template v-else>
          <div class="info-item">
            <div class="label">昵称</div>
            <div class="value">
              <span>{{ baseInfo.username }}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="label">简介</div>
            <div class="value">
              <span v-if="baseInfo.intro"> {{ baseInfo.intro }}</span>
              <span v-else class="placeholder">未填写</span>
            </div>
          </div>
        </template>
      </div>
      <div class="button">
        <csg-button v-if="isEdit" @click="handleClickFinish">完成</csg-button>
        <csg-button v-else type="warn" @click="handleClickEdit">编辑</csg-button>
      </div>
    </csg-card>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, inject, onBeforeMount } from 'vue'
import userAvatar from './components/userAvatar.vue'

import { getUserInfo, updateUserInfo } from '@/api/user'
const $csgMessage = inject('$csgMessage') as Function

const isEdit = ref(false)

const ruleValidate = {
  username: [
    {
      required: true,
      message: '请填写昵称',
      trigger: 'blur'
    }
  ]
}

const baseInfo = reactive({
  username: '',
  usercode: '',
  intro: ''
})

const handleClickEdit = () => {
  isEdit.value = true
}

const handleClickFinish = () => {
  let data = {
    username: baseInfo.username,
    intro: baseInfo.intro
  }
  UpdateUserInfo(data)
}

const UpdateUserInfo = async (data: { username: string; intro?: string }) => {
  await updateUserInfo(data).then((res) => {
    if (res.code == 200) {
      $csgMessage({
        type: 'success',
        message: '成功'
      })
      isEdit.value = false
    }
  })
}

const GetUserInfo = () => {
  getUserInfo().then((res) => {
    let data = res.data
    baseInfo.username = data.username
    baseInfo.usercode = data.usercode
    baseInfo.intro = data.intro
  })
}

const onload = () => {
  GetUserInfo()
}

onBeforeMount(() => {
  onload()
})
</script>
<style scoped lang="less">
.base-info-wrap {
  width: 100%;

  .avatar-wrap {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .info-card {
    width: 500px;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    padding: @base-padding;
    .infos {
      .info-item {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        .label {
          font-weight: bold;
          margin-right: 10px;
          flex-shrink: 0;
        }

        .value {
          flex-grow: 1;
          width: 100%;
        }
      }
    }

    .button {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
