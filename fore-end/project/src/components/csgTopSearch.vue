<template>
  <div class="csg-top-search-wrap">
    <div class="input-wrap">
      <input type="text" v-model="searchKey" @keyup.enter="handleSearch" />
    </div>
    <div class="pre-icon"></div>
    <div class="button" @click="handleSearch">
      <div>搜索</div>
    </div>
  </div>
</template>
<script setup>
import { ref, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const searchKey = ref('')
const $pub = inject('$pub')
const handleSearch = () => {
  let isIndex = route.name === 'Index'

  if (isIndex) {
    $pub('topbar-search', searchKey.value)
  } else {
    router.push({
      name: 'Index',
      query: {
        isIndex,
        filter: searchKey.value
      }
    })
  }
}
</script>
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
