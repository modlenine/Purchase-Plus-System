import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Prlist from '@/views/Prlist.vue'
import Createpr from '@/views/Createpr.vue'
import Viewdata from '@/views/Viewdata.vue'
import Editpr from '@/views/Editpr.vue'
// import Test from '@/views/Test.vue'
import Login from '@/views/Loginpage.vue'
import Editprpurchase from '@/views/Editprpurchase.vue'
import Printpr from '@/components/Printpr.vue'

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
  {
    path: '/prlist',
    name: 'Prlist',
    component: Prlist,
    metaInfo:{
      title:'หน้าหลักของโปรแกรม'
    }
  },
  {
    path: '/createpr',
    name: 'Createpr',
    component: Createpr,
    metaInfo:{
      title:'หน้าสร้างรายการ PR'
    }
  },
  {
    path:'/viewdata/:formno',
    name:'Viewdata',
    component:Viewdata
  },
  {
    path:'/editpr/:formno',
    name:'Editpr',
    component:Editpr
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  },
  {
    path:'/editprpurchase/:formno',
    name:'Editprpurchase',
    component:Editprpurchase
  },
  {
    path: '/print',
    name: 'PrintPage',
    component: Printpr,
    props: route => ({ message: route.query.message })
  }
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