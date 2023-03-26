<template>
  <div ref="csgForm" class="csg-forms-wrap">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
interface Props {
  model?: object
  rules?: object
}

const props = defineProps<Props>()

const csgForm = ref()

watchEffect(() => {
  let form = csgForm.value
  for (let key in props.rules) {
    let dom = form?.querySelector(`.csg-from-item #${key}`)
    console.log('dom', dom)
    // dom.setAttribute('required', 'true')
  }
})

const required = () => {
  let form = csgForm.value
  console.log('form', form)
  for (let key in props.rules) {
    console.log('key', key)
    let dom = document.querySelectorAll(`.csg-from-item #${key}`)[0]
    console.log('dom', dom)
    // dom.setAttribute('required', 'true')
  }
}

const verify = () => {
  for (let key in props.rules) {
    let dom = document.querySelectorAll(`.csg-from-item #${key}`)[0]
    dom.setAttribute('failCheck', 'true')
  }
}

onMounted(async () => {
  // setTimeout(() => {
  //   required()
  // }, 20)
  // required()
})

defineExpose({
  verify
})
</script>
<style scoped></style>
