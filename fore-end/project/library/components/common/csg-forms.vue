<template>
  <div ref="csgForm" class="csg-forms-wrap">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { isEmpty } from '@/utils/validate'
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
  let requiredFlag = true
  let validatorFlag = true
  for (let key in props.rules) {
    let domwrap = document.querySelector(`.csg-from-item.${key} div`) as HTMLElement
    let failMsgDom = document.querySelector(`.csg-from-item.${key} .fail-msg`) as HTMLElement
    let dom = document.querySelector(`.csg-from-item.${key} .form-element`) as HTMLFormElement
    let rule: Rule[] = props.rules[key]

    for (let item of rule) {
      if (item.validator) {
        let callback = (msg: any) => {
          if (msg) {
            domwrap?.setAttribute('failCheck', 'true')
            failMsgDom.innerHTML = msg
            validatorFlag = false
          } else {
            domwrap?.setAttribute('failCheck', 'false')
            failMsgDom.innerHTML = ''
          }
        }
        let eventValidator = function () {
          if (!isEmpty((props.model as Model)[key])) {
            item.validator!((props.model as Model)[key], callback)
          }
        }
        dom.removeEventListener(item.trigger, eventValidator)
        eventValidator()
        dom.addEventListener(item.trigger, eventValidator)
      }

      if (item.required) {
        let eventRequired = function () {
          if (isEmpty((props.model as Model)[key])) {
            domwrap?.setAttribute('failCheck', 'true')
            failMsgDom.innerHTML = item.message
            requiredFlag = false
          } else {
            domwrap?.setAttribute('failCheck', 'false')
            failMsgDom.innerHTML = ''
          }
        }
        dom.removeEventListener(item.trigger, eventRequired)
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
