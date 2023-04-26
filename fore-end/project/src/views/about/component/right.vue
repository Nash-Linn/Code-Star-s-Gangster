<template>
  <div class="code-info">
    <header class="title">碎碎念</header>
    <div class="desc">该项目代码开源，欢迎大家提出建议，共同学习。林小趴菜谢谢大家指导！</div>
    <div class="desc-title">仓库地址：</div>
    <div class="desc">
      <a href="https://github.com/Nash-Linn/Code-Star-s-Gangster.git"
        >https://github.com/Nash-Linn/Code-Star-s-Gangster.git
      </a>
    </div>
  </div>
</template>
<script setup></script>
<style lang="less" scoped>
.code-info {
  background-color: #fff;
  border-radius: @base-border-radius;
  padding: @base-padding;
}

.title {
  font-size: @title-font-size;
  font-weight: bold;
  margin-bottom: 10px;
}
.desc-title {
  margin: 10px 0 5px 0;
  font-weight: bold;
}
.desc {
  text-indent: 2rem;
  a {
    color: @base-color;
  }
}
</style>
