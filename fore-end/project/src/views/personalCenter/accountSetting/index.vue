<template>
  <div class="account-setting-wrap">
    <header class="header">
      <span class="title">账号设置</span>
    </header>
    <div class="divide-line"></div>
    <div class="content-wrap">
      <div class="item">
        <div>密码</div>
        <div class="csg-link" @click="handleAlterPasswordDialog">修改密码</div>
      </div>
    </div>
  </div>
  <csgAlterPassword v-model="alterPasswordVisible" />
</template>
<script setup lang="ts">
import csgAlterPassword from './components/csgAlterPassword.vue'
import { ref } from 'vue'

const alterPasswordVisible = ref(false)

const handleAlterPasswordDialog = () => {
  alterPasswordVisible.value = true
}
</script>
<style lang="less" scoped>
.account-setting-wrap {
  padding: 20px;
}
.header {
  .title {
    font-size: @title-font-size;
    font-weight: bold;
  }

  margin-bottom: 20px;
}

.content-wrap {
  margin-top: 20px;

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
