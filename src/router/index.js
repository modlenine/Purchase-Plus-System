import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
// import Test from '@/views/Test.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    metaInfo:{
      title:'หน้าหลักของโปรแกรม'
    }
  },
  // {
  //   path:'/test',
  //   name:'Test',
  //   component:Test
  // }


  // {
  //   path:'/viewdata/:id',
  //   name:'Viewdata',
  //   component:Viewdata
  // },
  // {
  //   path:'/edit/:id',
  //   name:'Edit',
  //   component:Edit,
  // },

  // {
  //   path: '/list',
  //   name: 'List',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '@/views/List.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
