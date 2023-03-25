<template>
  <div>
    <csg-menu>
      <csg-menu-item
        v-for="(item, index) in getRoutes"
        :key="index"
        :id="item.name"
        :to="`/personalCenter/${item.path}`"
      >
        {{ item.meta!.title }}
      </csg-menu-item>
    </csg-menu>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const getRoutes = computed(() => {
  const Router = useRouter()
  let allRoutes = Router.options.routes

  let routers = allRoutes.find((item) => item.name == 'PersonalCenter')?.children
  return routers
})
</script>
<style scoped></style>
