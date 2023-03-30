<template>
  <div class="csg-blogs-card">
    <div v-if="imgUrl" class="left">
      <img class="cover-img" :src="imgUrl" alt="" />
    </div>
    <div class="right">
      <div class="top">
        <div class="title">
          <span class="underline">
            {{ props.data.title }}
          </span>
        </div>
        <span class="summary">{{ props.data.summary }}</span>
      </div>
      <div class="bottom">
        <div class="creator">{{ props.data.creatorString }}</div>
        <div class="create-time">{{ parseTime(props.data.createTime) }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { baseURL } from '@/config'
import { parseTime } from '@/utils/index'
interface Data {
  creatorString: string
  title: string
  coverUrl: string
  summary: string
  createTime: string
}

interface Props {
  data: Data
}
const props = defineProps<Props>()

const imgUrl = computed(() => {
  if (!props.data.coverUrl) {
    return ''
  }

  return baseURL + 'blogsManage/image/' + props.data.coverUrl
})
</script>
<style scoped lang="less">
.csg-blogs-card {
  width: 100%;
  background-color: #fff;
  border-radius: @base-border-radius;
  padding: 10px;
  display: flex;

  .left {
    margin-right: 20px;
    .cover-img {
      width: 160px;
      height: 90px;
      border-radius: @base-border-radius;
    }
  }

  .right {
    width: 100%;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top {
      max-height: 72px;

      .title {
        font-size: @title-font-size;
        font-weight: bold;

        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
      .summary {
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
    }
    .bottom {
      height: 18px;
      display: flex;
      justify-content: flex-end;

      .creator {
        margin-right: 20px;
      }
    }
  }
}
</style>
