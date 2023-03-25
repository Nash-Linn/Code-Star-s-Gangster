<template>
  <div class="csg-menu-wrap" :class="menuStyle">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

interface Prop {
  type?: 'horizontal' | 'vertiacal'
}

const props = withDefaults(defineProps<Prop>(), {
  type: 'vertiacal'
})

const menuStyle = computed(() => {
  let style
  switch (props.type) {
    case 'horizontal':
      style = 'horizontal'
      break
    case 'vertiacal':
      style = 'vertiacal'
      break
    default:
      style = 'vertiacal'
      break
  }
  return style
})
</script>
<style scoped lang="less">
.horizontal {
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.vertiacal {
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.csg-menu-wrap {
  display: flex;
}
</style>
