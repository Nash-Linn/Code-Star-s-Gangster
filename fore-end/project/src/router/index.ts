import csgMessage from '@lib/components/functionComponents/csgMessage';
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import { isHashRouterMode } from '@/config'
import { getToken } from '@/utils/token'

const Routes =  [
  {
    path: '/',
    name: 'Index',
    component: ()=>import('@/views/index/index.vue'),
    meta:{
      title:'博客'
    },
  },
  {
    path: '/about',
    name: 'About',
    component: ()=>import('@/views/about/index.vue'),
    meta:{
      title:'关于'
    },
  },
  {
    path: '/personalCenter',
    name: 'PersonalCenter',
    component: ()=>import('@/views/personalCenter/index.vue'),
    meta:{
      auth:true
    },
    children:[
      {
        path: '',
        name: 'PersonalBaseInfo',
        component: ()=>import('@/views/personalCenter/baseInfo/index.vue'),
        meta:{
          title:'个人信息',
        }
      },
      {
        path: 'accountSetting',
        name: 'AccountSetting',
        component: ()=>import('@/views/personalCenter/accountSetting/index.vue'),
        meta:{
          title:'账号设置',
        }
      },
      {
        path: 'contentManage',
        name: 'ContentManage',
        component: ()=>import('@/views/personalCenter/contentManage/index.vue'),
        meta:{
          title:'内容管理',
        }
      }
    ]
  },
  {
    path: '/publishBlog',
    name: 'PublishBlog',
    component: ()=>import('@/views/publishBlog/index.vue'),
    meta:{
      title:'发布博客',
      auth:true,
    },
  },
  {
    path: '/blogDetail/:id',
    name: 'BlogDetail',
    component: ()=>import('@/views/blogDetail/index.vue'),
    meta:{
      title:'博客详情',
    },
  },
  {
    path: '/test',
    name: 'Test',
    component: ()=>import('@/views/test/index.vue'),
  },
]


const router = createRouter({
  history: isHashRouterMode
    ? createWebHashHistory(import.meta.env.BASE_URL)
    : createWebHistory(import.meta.env.BASE_URL),
  routes: Routes,
})


//全局守卫
router.beforeEach((to, from, next)=> {
  if(to.meta.auth){
    if( getToken() ){
      next()
    }else{
      csgMessage({
        type:'warn',
        message:'请先登录，谢谢！'
      })
    }
  }else{
    next()
  }
})

  

export default router
