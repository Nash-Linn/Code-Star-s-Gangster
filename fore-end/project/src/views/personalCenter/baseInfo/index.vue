<template>
  <div class="base-info-wrap">
    <div>
      <div class="avatar">
        <userAvatar />
      </div>
      <div class="infos">
        <div v-if="isEdit"></div>
        <div v-else></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import userAvatar from './components/userAvatar.vue'

const isEdit = ref(false)
</script>
<style scoped lang="less">
.base-info-wrap {
  display: flex;
  justify-content: center;
}
</style>
