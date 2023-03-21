<template>
  <div class="csg-popover-wrap">
    <div class="reference">
      <slot name="reference">
        <div class="placeholer">按钮</div>
      </slot>

      <div class="pop-content">
        <slot>我是弹出层</slot>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="less" scoped>
.csg-popover-wrap {
  font-size: @base-font-size;
}
.reference {
  position: relative;

  cursor: pointer;

  .placeholer {
    padding: 5px 10px;
    background-color: #ccc;
    border-radius: @base-border-radius;
  }
}

.pop-content {
  position: absolute;
  width: 200px;
  height: 300px;
  background-color: #bfa;
}
</style>
