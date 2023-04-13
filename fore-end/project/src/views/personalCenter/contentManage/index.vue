<template>
  <div>
    <header class="header">
      <div class="title">内容管理</div>
      <div class="search">
        <csg-input
          v-model="searchData.key"
          @keyup.enter="handleSearch"
          size="small"
          label="搜索文章"
        >
          <template #suffix>
            <div class="suffix-icon" @click="handleSearch">
              <img id="inactive" src="@/assets/icons/search1.png" alt="" />
              <img id="active" src="@/assets/icons/search2.png" alt="" />
            </div>
          </template>
        </csg-input>
      </div>
    </header>
    <div class="divide-line"></div>
    <div class="content">
      <csgBlogCard class="blog-card" v-for="(item, index) in blogList" :key="index" :data="item">
        <template #bottom-right>
          <div class="bottom-right">
            <div class="edit-button" @click.stop="handleEditBlog(item)">编辑</div>
            <div class="delete-button" @click.stop="handleDeleteBlog(item)">删除</div>
          </div>
        </template>
      </csgBlogCard>
    </div>
  </div>
</template>
<script setup lang="ts">
import csgBlogCard from '@/components/csgBlogCard.vue'
import { ref, reactive, onBeforeMount } from 'vue'
import { getMyBlogList } from '@/api/blogsManage/blogsManage'

const searchData = reactive({
  key: ''
})

const handleSearch = () => {
  console.log('searchData', searchData)
}

const blogList: any = ref([])

const GetMyBlogList = (data: any) => {
  getMyBlogList(data).then((res) => {
    blogList.value = res.data.data
  })
}

const handleEditBlog = (blog: any) => {
  console.log('编辑', blog)
}

const handleDeleteBlog = (blog: any) => {
  console.log('删除', blog)
}

const onload = () => {
  GetMyBlogList({})
}
onBeforeMount(() => {
  onload()
})
</script>
<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    font-size: @title-font-size;
    font-weight: bold;
  }

  .suffix-icon {
    height: 100%;
    width: 30px;
    cursor: pointer;

    img {
      width: 30px;
    }

    #active {
      display: none;
    }

    &:hover {
      #inactive {
        display: none;
      }
      #active {
        display: block;
      }
    }
  }

  margin-bottom: 20px;
}

.content {
  margin-top: 20px;

  .blog-card {
    margin-bottom: 10px;

    .bottom-right {
      display: flex;

      .edit-button {
        margin-right: 20px;

        &:hover {
          color: @base-color;
        }
      }

      .delete-button {
        &:hover {
          color: @base-color;
        }
      }
    }
  }
}
</style>
