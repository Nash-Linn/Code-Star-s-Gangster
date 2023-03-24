import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import { isHashRouterMode } from '@/config'

const Routes =  [
  {
    path: '/',
    name: 'Index',
    component: ()=>import('@/views/indexPage.vue'),
  },
 
]


const router = createRouter({
  history: isHashRouterMode
    ? createWebHashHistory(import.meta.env.BASE_URL)
    : createWebHistory(import.meta.env.BASE_URL),
  routes: Routes,
})

export default router
