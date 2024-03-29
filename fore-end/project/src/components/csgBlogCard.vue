<template>
  <csg-card class="csg-blogs-card" hover @click="handleClickCard">
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
        <div class="bottom-left">
          <div class="create-time">
            {{ parseTime(props.data.createTime) }}
          </div>
          <div class="blog-tags">
            <csg-tag
              class="tag-item"
              v-for="(item, index) in props.data.tags"
              :key="index"
              size="small"
              hoverColor="rgba(78, 210, 210,0.4)"
              @click.stop="handleClickTag(item)"
              >{{ item.name }}</csg-tag
            >
          </div>
        </div>
        <div class="bottom-right">
          <slot name="bottom-right">{{ props.data.creatorName }}</slot>
        </div>
      </div>
    </div>
  </csg-card>
</template>
<script setup lang="ts">
import { computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import { baseURL } from '@/config'
import { parseTime } from '@/utils/index'

const $pub = inject('$pub') as any

const router = useRouter()

interface Data {
  id: string
  creatorName: string
  title: string
  coverUrl: string
  summary: string
  createTime: string
  tags?: any[]
}

interface Props {
  data: Data
}
const props = defineProps<Props>()

const imgUrl = computed(() => {
  if (!props.data.coverUrl) {
    return ''
  }
  return baseURL + '/blogsManage/cover/' + props.data.coverUrl
})

const handleClickCard = () => {
  router.push(`/blogDetail/${props.data.id}`)
}

const handleClickTag = (tag: any) => {
  $pub('click-card-tag', tag)
}
</script>
<style scoped lang="less">
.csg-blogs-card {
  width: 100%;
  padding: 10px;
  display: flex;
  cursor: pointer;

  .left {
    width: 160px;
    height: 90px;
    border-radius: @base-border-radius;
    border: 1px solid @base-color-border;
    margin-right: 20px;

    .cover-img {
      width: 160px;
      height: 90px;
      border-radius: @base-border-radius;
      border: none;
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
      justify-content: space-between;

      .bottom-left {
        display: flex;
        align-items: center;

        .create-time {
          margin-right: 10px;
        }

        .blog-tags {
          .tag-item {
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>
