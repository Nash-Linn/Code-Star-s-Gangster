<template>
  <div class="author-info">
    <header class="title">关于作者</header>
    <div class="author-name">林小趴菜</div>
    <div class="author-desc">
      一名工作{{ years }}年多的社畜，主做前端开发。喜欢学习折腾，倒腾个网站记录日常学习。
    </div>
  </div>
</template>
<script setup>
let years = new Date().getFullYear() - 2021
</script>
<style lang="less" scoped>
.author-info {
  background-color: #fff;
  border-radius: @base-border-radius;
  padding: @base-padding;
}

.title {
  font-size: @title-font-size;
  font-weight: bold;
}

.author-name {
  margin: 10px 0;
  font-weight: bold;
  text-align: center;
}
</style>
