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
  let requiredFlag = false
  let validatorFlag = false
  for (let key in props.rules) {
    let domwrap = document.querySelector(`.csg-from-item .${key}`) as HTMLElement
    let dom = document.querySelector(`.csg-from-item #${key}`) as HTMLElement
    let rule: Rule[] = props.rules[key]

    for (let item of rule) {
      if (item.validator) {
        let callback = (msg: any) => {
          if (msg) {
            domwrap?.setAttribute('failCheck', 'true')
            domwrap?.setAttribute('failMsg', msg)
            validatorFlag = false
          } else {
            domwrap?.setAttribute('failCheck', 'false')
            validatorFlag = true
          }
        }
        let eventValidator = function () {
          if (!isBlank((props.model as Model)[key])) {
            item.validator!((props.model as Model)[key], callback)
          }
        }
        eventValidator()
        dom.addEventListener(item.trigger, eventValidator)
      }

      if (item.required) {
        let eventRequired = function () {
          if (isBlank((props.model as Model)[key])) {
            domwrap?.setAttribute('failCheck', 'true')
            domwrap?.setAttribute('failMsg', item.message)
            requiredFlag = false
          } else {
            domwrap?.setAttribute('failCheck', 'false')
            requiredFlag = true
          }
        }
        eventRequired()
        dom.addEventListener(item.trigger, eventRequired)
      }
    }
  }

  return requiredFlag && validatorFlag
}

defineExpose({
  verify
})
</script>
<style scoped></style>
