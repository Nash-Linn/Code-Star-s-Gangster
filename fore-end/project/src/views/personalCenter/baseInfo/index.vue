<template>
  <div class="base-info-wrap">
    <div class="avatar">
      <userAvatar />
    </div>
    <div class="divide-line"></div>
    <csg-card class="info-card">
      <div class="infos">
        <div class="info-item">
          <div class="label">账号</div>
          <div class="value">{{ baseInfo.usercode }}</div>
        </div>
        <div class="info-item">
          <div class="label">昵称</div>
          <div class="value">
            <csg-input v-if="isEdit" size="small" v-model="baseInfo.username" />
            <span v-else>{{ baseInfo.username }}</span>
          </div>
        </div>
        <div class="info-item">
          <div class="label">简介</div>
          <div class="value">
            <csg-textarea v-if="isEdit" v-model="baseInfo.intro" />
            <template v-else>
              <span v-if="baseInfo.intro"> {{ baseInfo.intro }}</span>
              <span v-else class="placeholder">未填写</span>
            </template>
          </div>
        </div>
      </div>
      <div class="button">
        <csg-button v-if="isEdit" @click="handleClickFinish">完成</csg-button>
        <csg-button v-else type="warn" @click="handleClickEdit">编辑</csg-button>
      </div>
    </csg-card>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onBeforeMount } from 'vue'
import userAvatar from './components/userAvatar.vue'

import { getUserInfo } from '@/api/user'

const isEdit = ref(false)

const baseInfo = reactive({
  username: '',
  usercode: '',
  intro: ''
})

const handleClickEdit = () => {
  isEdit.value = true
}

const handleClickFinish = () => {
  console.log('baseInfo', baseInfo)
  // isEdit.value = false
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

  .avatar {
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
