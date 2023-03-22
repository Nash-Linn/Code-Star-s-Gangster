import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import registerCsg from '../library/components/common/index'
import {setupCsg} from '../library/setup'
import { setupStore } from '@/stores/index'

const app = createApp(App)

setupCsg(app)
setupStore(app)

app.use(router)

app.use(registerCsg)

app.mount('#app')
