<template>
  <div class="index-wrap" ref="indexWrapRef">
    <csg-scroll class="scroll" :height="scrollHeight" @on-max="handleLoadMore">
      <div class="scroll-inner">
        <csgBlogCard
          class="blog-card"
          v-for="(item, index) in blogList"
          :key="index"
          :data="item"
        />
        <csg-loadmore :more="showMore" :loading="loading" />
      </div>
    </csg-scroll>
    <footer class="footer">
      ©csgblog.xyz <span class="icp" @click="goToICP">浙ICP备2023016699号-1</span>
    </footer>
  </div>
</template>
<script setup lang="ts">
import csgBlogCard from '@/components/csgBlogCard.vue'

import { onMounted, ref, reactive, inject, computed } from 'vue'
import { getList } from '@/api/blogsManage/blogsManage'

const indexWrapRef = ref()

const wrapHeight = ref()
const scrollHeight = computed(() => {
  let basePadding = 10
  let footer = document.querySelector('.footer')
  let footerHeight = footer?.clientHeight as number
  return wrapHeight.value - 3 * basePadding - footerHeight - 1
})

const $sub = inject('$sub') as Function

$sub('topbar-search', (val: string) => {
  filters.keyword = val
  filters.page = 1
  blogList.value.length = 0
  GetList(filters)
})

const blogList: any = ref([])

const GetList = (data: any) => {
  loading.value = true
  getList(data)
    .then((res) => {
      let data = res.data.data
      if (data.length > 0) {
        blogList.value.push(...data)
      }

      let total = res.data.total
      if (total > filters.page * filters.pageSize) {
        showMore.value = true
        filters.page++
      } else {
        showMore.value = false
      }
    })
    .finally(() => {
      loading.value = false
    })
}

//加载更多
const filters = reactive({
  page: 1,
  pageSize: 10,
  keyword: ''
})
//显示加载更多
const showMore = ref(false)
const loading = ref(false)

const handleLoadMore = () => {
  if (loading.value || !showMore.value) {
    return
  }
  GetList(filters)
}
const onload = () => {
  GetList({})
  wrapHeight.value = indexWrapRef.value ? indexWrapRef.value?.clientHeight : 0
  window.onresize = () => {
    wrapHeight.value = indexWrapRef.value ? indexWrapRef.value?.clientHeight : 0
  }
}

const goToICP = () => {
  window.open('https://beian.miit.gov.cn/')
}

onMounted(() => {
  onload()
})
</script>
<style lang="less" scoped>
.index-wrap {
  width: 100%;
  padding: 10px;

  min-height: @main-height;
  border-radius: @base-border-radius;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .blog-card {
    margin-bottom: 10px;
  }
}

.scroll {
  border-radius: @base-border-radius;
  overflow: hidden;

  .scroll-inner {
    padding: 10px;
  }
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;

  .icp {
    margin-left: 10px;

    &:hover {
      color: @base-color;
      cursor: pointer;
    }
  }
}
</style>
