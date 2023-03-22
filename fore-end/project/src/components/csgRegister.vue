<template>
  <div class="login-wrap">
    <csg-form-item>
      <csg-input label="账号" />
    </csg-form-item>
    <csg-form-item>
      <csg-input label="密码" type="password" />
    </csg-form-item>
    <csg-form-item>
      <csg-input label="再次输入密码" type="password" />
    </csg-form-item>

    <div class="button-wrap">
      <csg-button class="login-button"> 立即注册 </csg-button>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
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
