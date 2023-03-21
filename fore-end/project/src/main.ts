import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import registerCsg from '../library/components/common/index'
import {setupCsg} from '../library/setup'

const app = createApp(App)

setupCsg(app)

app.use(createPinia())
app.use(router)

app.use(registerCsg)

app.mount('#app')
