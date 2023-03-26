<template>
  <div ref="csgForm" class="csg-forms-wrap">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { isBlank } from '@/utils/validate'
import { ref } from 'vue'

interface Rule {
  required?: boolean
  message: string
  trigger: string
  validator?: Function
}

interface Model {
  [propName: string]: any
}

interface Props {
  model?: Model
  rules?: {
    [key: string]: Rule[]
  }
}

const props = withDefaults(defineProps<Props>(), {})

const csgForm = ref()

const verify = () => {
  for (let key in props.rules) {
    let dom = document.querySelector(`.csg-from-item #${key}`) as HTMLElement
    let rule: Rule[] = props.rules[key]
    for (let item of rule) {
      if (item.required && isBlank((props.model as Model)[key])) {
        dom?.setAttribute('failCheck', 'true')
        dom?.setAttribute('failMsg', item.message)
      }
    }
  }
}

defineExpose({
  verify
})
</script>
<style scoped></style>
