<template>
  <div class="csg-top-search-wrap">
    <div class="input-wrap">
      <input type="text" />
    </div>
    <div class="pre-icon"></div>
    <div class="button">
      <div>搜索</div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="less" scoped>
input {
  border: none;
}

.csg-top-search-wrap {
  height: 35px;
  width: 100%;
  border: 1px solid @base-color-border;
  border-radius: @base-border-radius;
  overflow: hidden;

  div {
    float: left;
  }

  .pre-icon {
    width: 30px;
    height: 100%;
    margin-left: -100%;
  }

  .input-wrap {
    height: 100%;
    width: 100%;
    padding: 0 100px 0 30px;

    input {
      height: 100%;
      width: 100%;
      font-size: 14px;
    }
  }

  .button {
    width: 100px;
    height: 100%;
    background-color: @base-color;
    margin-left: -100px;

    display: flex;
    justify-content: center;
    align-items: center;

    color: #fff;
    cursor: pointer;
    user-select: none;
  }
}
</style>
