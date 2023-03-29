<template>
  <div>
    <test class="container-wrap" />
  </div>
</template>
<script setup>
import test from './components/test.vue'
</script>
<style lang="less" scoped>
.container-wrap {
  width: 100%;
  min-height: 300px;
  background-color: red;
}
</style>
