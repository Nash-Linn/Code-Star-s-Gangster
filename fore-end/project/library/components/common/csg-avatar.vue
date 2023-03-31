<template>
  <div
    class="csg-avatar-warp"
    :style="`width:${props.size};height:${props.size};font-size:${props.fontsize};`"
  >
    <div v-if="props.imgurl">
      <img :src="props.imgurl" />
    </div>
    <div v-else class="desc">
      {{ props.desc }}
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  //图片地址
  imgurl?: string
  //描述
  desc?: string
  //容器大小
  size?: string
  //字体大小
  fontsize?: string
}

const props = withDefaults(defineProps<Props>(), {
  desc: ''
})
</script>
<style lang="less" scoped>
.csg-avatar-warp {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: @base-color;
  overflow: hidden;
  font-size: 14px;

  display: flex;
  justify-content: center;
  align-items: center;

  .desc {
    color: #fff;
  }

  img {
    width: 100%;
    height: auto;
  }
}
</style>
