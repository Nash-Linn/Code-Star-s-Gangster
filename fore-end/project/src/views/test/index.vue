<template>
  <csg-scroll :autoHide="false" height="500">
    <div v-for="(item, index) in 100" :key="index">{{ item }}</div>
  </csg-scroll>
</template>
<script setup></script>
<style lang="less" scoped></style>
