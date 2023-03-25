<template>
  <div class="csg-menu-item-wrap">
    <router-link :to="props.to" class="router-link" :class="{ actived: props.actived }">
      <slot />
    </router-link>
  </div>
</template>
<script setup lang="ts">
interface Prop {
  //跳转路径
  to: string
  //是否显示选中状态
  actived?: boolean
}
const props = withDefaults(defineProps<Prop>(), {
  to: '/',
  actived: true
})
</script>
<style scoped lang="less">
.csg-menu-item-wrap {
  width: 100%;
  display: table;
  text-align: center;
  line-height: 40px;

  margin-bottom: 10px;
  cursor: pointer;
  user-select: none;
}

.router-link {
  display: block;
  width: 100%;
  height: 100%;
  color: #333333;
  border: 1px solid @base-color-border;
  border-radius: @base-border-radius;
}

.actived.router-link-exact-active {
  background-color: @base-color;
  border-color: @base-color;
  color: #fff;
}
</style>
