<template>
  <div class="site-info">
    <header class="title">Code Star's Gangster</header>
    <div class="site-logo">
      <img src="@/assets/avatar/avatar.png" alt="" />
    </div>
    <div class="site-desc">
      <div class="desc-title">Code Star's Gangster 名字由来：</div>
      <div class="desc">
        在最开始想的名字是 Code Star
        之类的，但发现网上已经存在。然后在和朋友讨论名字该叫什么好，最终通过翻译软件翻译，发现叫码星暴徒（码星黑帮），好像也挺不错，挺中二的。
        然后这个网站就开始正式动工，在平时工作之余慢慢进行搭建。
      </div>
      <div class="desc-title">关于上面这张图：</div>
      <div class="desc">
        想着码农的学习是无止境，然后就掏出画图软件，简单的画了两个圈，组合成一个无穷的符号。
        然后再给这个图标添加个背景色，就采用了这个网站的主题色，这张图就出现了。
        它会作为每个用户的默认头像。
      </div>
      <div class="desc-title">关于网站：</div>
      <div class="desc">
        该网站前端使用VUE3 + TypeScript + Vite 构建。 后端使用Nest + MySql
        构建。由于平时工作用的都是前端，后端都不是很熟，不断踩坑，基本处于一个现学现用的状态。
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="less" scoped>
.site-info {
  background-color: #fff;
  border-radius: @base-border-radius;
  padding: @base-padding;
}

.title {
  font-size: @title-font-size;
  font-weight: bold;
}
.site-logo {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}
.site-desc {
  .desc-title {
    margin: 10px 0 5px 0;
    font-weight: bold;
  }
  .desc {
    text-indent: 2rem;
  }
}
</style>
