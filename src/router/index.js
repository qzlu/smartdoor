import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout'

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    component:() => import('@/views/Login/index.vue')
  },
  {
    path: '/',
    component: () => import('@/views/Layout/index.vue'),
    redirect:'/project',
    children:[
      {
        path:'/project',
        component:() => import('@/views/project.vue'),
        meta:{
          name:'项目信息'
        }
      },
      {
        path:'/doorInfo',
        component:() => import('@/views/doorInfo.vue'),
        meta:{
          name:'门禁信息'
        }
      },
      {
        path:'/userAddress',
        component:() => import('@/views/userAddress.vue'),
        meta:{
          name:'户址信息'
        }
      },
      {
        path:'/user',
        component:() => import('@/views/user.vue'),
        meta:{
          name:'用户信息'
        }
      },
      {
        path:'/visitorRecord',
        component:() => import('@/views/visitorRecord.vue'),
        meta:{
          name:'访客记录'
        }
      },
      {
        path:'/entryRecord',
        component:() => import('@/views/entryRecord.vue'),
        meta:{
          name:'出入记录'
        }
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
