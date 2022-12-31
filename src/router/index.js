import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Layout from '@/layout'




Vue.use(VueRouter)



export const constantRoutes = [
  {
    path: '/login',
    // component: () => import('@/views/Login'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    name:'Layout',
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        // component: () => import('src/views/Login.vue'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard'}
      },
    ]
  },
]

const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/views/Login'),
    
    // component: require(`@/views/${'Login'}.vue`).default,
    meta: {
      title: '登录系统'
    }
  },
  {
    path:'/',
    name: 'Layout',
    component: Layout,
    redirect:'/index',
    children: [
      {
        path: 'system',
        name: 'System',
        component: () => import('@/views/index'),
        children: [
        ]
      },
      {
        path:'index',
        name:'Index',
        component: () => import('@/views/index')
      },
      // {
      //   path:'system/role',
      //   name:'Role',
      //   component: () => import('@/views/system/role')
      // },
      // {
      //   path:'system/menu',
      //   name:'Role',
      //   component: () => import('@/views/system/menu')
      // },
      // {
      //   path: 'user',
      //   name: 'User',
      //   component: () => import('@/views/system/user')
      // }
    ]
  }
]


const router = new VueRouter({
  routes
})

export default router
