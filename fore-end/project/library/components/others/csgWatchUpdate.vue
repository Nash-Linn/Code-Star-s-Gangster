<template>
  <csg-dialog v-model="dialogVisible">
    <template #title>
      <div>提示</div>
    </template>
    <template #content>
      <div class="tip">该网站已更新，是否刷新页面？</div>
      <div class="button-wrap">
        <csg-button class="btn" type="warn" @click="handleCancel"> 取消 </csg-button>
        <csg-button class="btn" @click="handleConfirm"> 确定 </csg-button>
      </div>
    </template>
  </csg-dialog>
</template>
<script setup>
import { ref, computed } from 'vue'

import { Updater } from '@/utils/watchUpdate'

//实例化该类
const update = new Updater({
  timer: 60000
})

// 未更新通知
// update.on('no-update', () => {
//   console.log('未更新')
// })

//更新通知
const showDialog = ref(true)
const needUpdate = ref(false)

update.on('update', () => {
  if (!needUpdate.value) {
    needUpdate.value = true
  }
})

const dialogVisible = computed({
  set(val) {
    showDialog.value = val
  },
  get() {
    return showDialog.value && needUpdate.value
  }
})

const handleCancel = () => {
  showDialog.value = false
}

const handleConfirm = () => {
  window.location.reload()

  showDialog.value = false
  needUpdate.value = false
}
</script>
<style lang="less" scoped>
.tip {
  margin: 20px 0;
}
.button-wrap {
  width: 100%;
  display: flex;
  justify-content: center;

  .btn {
    margin: 0 10px;
  }
}
</style>
