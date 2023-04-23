import { createApp  } from 'vue'
import type{InjectionKey}from 'vue'
import csgMessageCom from '@lib/components/common/csg-message.vue'

const csgMessage= (option:{
  type?:"success"|"warn"|"danger",
  message:string
}) => {
  const mountNode = document.createElement('div')
  const Instance = createApp(csgMessageCom, {
   ...option,
  })
  document.body.appendChild(mountNode)
  Instance.mount(mountNode)
}

export default csgMessage
