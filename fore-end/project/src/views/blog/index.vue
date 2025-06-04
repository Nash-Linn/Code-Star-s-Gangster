<template>
  <div class="index-wrap" ref="indexWrapRef">
    <div class="content">
      <div class="left-nav-bar">
        <csgLeftNavBar @on-type-change="handleNavTypeChange" :navTypeId="navTypeId" />
      </div>
      <div class="right-part">
        <div class="top-bar">
          <div class="title">{{ blogStore.typeEnum[navTypeId] }}</div>
          <csg-select
            v-if="navTypeId != 0"
            v-model="choseTagId"
            @on-change="handleTagChange"
            :options="tagList"
            labelName="name"
            valueName="id"
          />
        </div>
        <csg-scroll class="scroll" :height="scrollHeight" @on-max="handleLoadMore" saveScrollTop>
          <transition name="slide-fade" mode="out-in">
            <div class="scroll-inner" v-if="showBlog">
              <csgBlogCard
                class="blog-card"
                v-for="(item, index) in blogList"
                :key="index"
                :data="item"
              />
              <csg-loadmore :more="showMore" :loading="loading" />
            </div>
          </transition>
        </csg-scroll>
      </div>
    </div>
    <footer class="footer">
      ©csgblog.online <span class="icp" @click="goToICP">浙ICP备2023016699号-2</span>
    </footer>
  </div>
</template>
<script setup lang="ts">
import csgBlogCard from '@/components/csgBlogCard.vue'
import csgLeftNavBar from '@/components/csgLeftNavBar.vue'

import { onMounted, ref, reactive, inject, computed, type Ref, onActivated } from 'vue'
import { getList } from '@/api/blogsManage/blogsManage'
import { useRoute, useRouter } from 'vue-router'

import { useBlogStore } from '@/stores/modules/blog'
import { tag } from '@/api/tagManage/tagManage'

const blogStore = useBlogStore()

const route = useRoute()
const router = useRouter()

const indexWrapRef = ref()

const wrapHeight = ref()
const scrollHeight = computed(() => {
  let basePadding = 10
  let topBar = document.querySelector('.top-bar')
  let topBarHeight = (topBar?.clientHeight as number) + 20
  let footer = document.querySelector('.footer')
  let footerHeight = footer?.clientHeight as number
  return wrapHeight.value - 3 * basePadding - footerHeight - topBarHeight
})

const $sub = inject('$sub') as Function

$sub('topbar-search', (val: string) => {
  filters.keyword = val
  filters.page = 1
  filters.tagId = null
  filters.typeId = null
  blogList.value.length = 0
  choseTagId.value = 0
  navTypeId.value = 0

  GetList(filters)
})

const blogList: any = ref([])
const showBlog = ref(true)

const GetList = async (data: Filters) => {
  loading.value = true
  data.keyword = data.keyword ? data.keyword.trim() : ''
  await getList(data)
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

interface Filters {
  page: number
  pageSize: number
  keyword: string
  tagId?: number | null
  typeId?: number | null
}

//加载更多

const filters = reactive<Filters>({
  page: 1,
  pageSize: 10,
  keyword: '',
  tagId: null,
  typeId: null
})

const filterInit = () => {
  filters.page = 1
  filters.pageSize = 10
  filters.keyword = ''
  filters.tagId = null
  filters.typeId = null
}

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
  GetList({
    page: 1,
    pageSize: 10,
    keyword: ''
  })
  wrapHeight.value = indexWrapRef.value ? indexWrapRef.value?.clientHeight : 0
  window.onresize = () => {
    wrapHeight.value = indexWrapRef.value ? indexWrapRef.value?.clientHeight : 0
  }
}

const goToICP = () => {
  window.open('https://beian.miit.gov.cn/')
}

//点击左侧导航栏 类型变化
const navTypeId = ref(0)
const handleNavTypeChange = async (val: number) => {
  navTypeId.value = val
  showBlog.value = false

  if (val != 0) {
    GetTagList(val)
  }

  filters.keyword = ''
  choseTagId.value = 0

  await getBlogListByType()
  showBlog.value = true
}

interface Tag {
  id: number
  name: string
}

const tagList: Ref<Tag[]> = ref([])

const GetTagList = (id: number) => {
  tag(id).then((res) => {
    tagList.value = res.data
    tagList.value.unshift({ id: 0, name: '全部' })
  })
}

const choseTagId = ref(0)
const handleTagChange = () => {
  getBlogListByType()
}

const getBlogListByType = async () => {
  filters.tagId = choseTagId.value
  filters.typeId = navTypeId.value
  filters.page = 1
  blogList.value.length = 0
  await GetList(filters)
}

$sub('click-card-tag', (tag: { typeId: number; id: number; name: string }) => {
  choseTagId.value = tag.id
  navTypeId.value = tag.typeId

  if (navTypeId.value != 0) {
    GetTagList(navTypeId.value)
  }
  getBlogListByType()
})

onMounted(() => {
  onload()
})

const onActivedload = async () => {
  if (route.query && route.query.isBlog === 'false') {
    blogList.value.length = 0
    choseTagId.value = 0
    navTypeId.value = 0
    filterInit()
    filters.keyword = route.query.filter as string
    await GetList(filters)
    router.push('/Blog')
  }
}

onActivated(() => {
  onActivedload()
})
</script>
<style lang="less" scoped>
.index-wrap {
  width: 100%;
  padding: 10px 20px;

  min-height: @main-height;
  border-radius: @base-border-radius;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .content {
    display: flex;
    padding-top: 10px;

    .left-nav-bar {
      width: @left-nav-bar-width;
      margin-right: 20px;
    }

    .right-part {
      width: 100%;
      .top-bar {
        font-size: 20px;
        font-weight: bold;
        background-color: #fff;
        border-radius: @base-border-radius;
        margin: 0 5px 10px;
        height: 50px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .scroll {
        width: 100%;
        border-radius: @base-border-radius;
        overflow: hidden;
        padding: 5px;
        .scroll-inner {
          .blog-card {
            margin-bottom: 10px;
          }
        }
      }
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
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
</style>
