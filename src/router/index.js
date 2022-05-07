import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  //登录界面路由
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('../components/Layout.vue'),
    redirect:'/main',
    children:[
      {
      path: '/main',
      name: 'main',
      component: () => import('../views/Main.vue'),
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('../views/child/Order.vue'),
        meta:{breadcrumb:['订单管理']}
      },
      {
        path: '/goodslist',
        name: 'goodslist',
        component: () => import('../views/child/goods/Goodslist.vue'),
        meta:{breadcrumb:['商品管理','商品列表']}
      },
      {
        path: '/addgood',
        name: 'addgood',
        component: () => import('../views/child/goods/Addgood.vue'),
        meta:{breadcrumb:['商品管理','添加商品']}
      },
      {
        path: '/goodsclass',
        name: 'goodsclass',
        component: () => import('../views/child/goods/Goodsclass.vue'),
        meta:{breadcrumb:['商品管理','商品分类']}
      },
      {
        path: '/shop',
        name: 'shop',
        component: () => import('../views/child/Shop.vue'),
        meta:{breadcrumb:['店铺管理']}
      },
      {
        path: '/userlist',
        name: 'userlist',
        component: () => import('../views/child/user/Userlist.vue'),
        meta:{breadcrumb:['账号管理','账号列表']}
      },
      {
        path: '/adduser',
        name: 'adduser',
        component: () => import('../views/child/user/Adduser.vue'),
        meta:{breadcrumb:['账号管理','添加账号']}
      },
      {
        path: '/editpwd',
        name: 'editpwd',
        component: () => import('../views/child/user/Editpwd.vue'),
        meta:{breadcrumb:['账号管理','修改密码']}
      },
      //用户个人信息界面路由
      {
        path: '/userinfo',
        name: 'userinfo',
        component: () => import('../views/child/user/Userinfo.vue'),
        meta:{breadcrumb:['账号管理','个人信息']}
      },
      {
        path: '/goodscont',
        name: 'goodscont',
        component: () => import('../views/child/cont/Goodscont.vue'),
        meta:{breadcrumb:['销售统计','商品统计']}
      },
      {
        path: '/ordercont',
        name: 'ordercont',
        component: () => import('../views/child/cont/Ordercont.vue'),
        meta:{breadcrumb:['销售统计','订单统计']}
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

import { checktoken } from '../api/apis'
//路由守卫
router.beforeEach((to,from,next) => {
  if(to.path == '/login'){
    next()
  }else{
    if(sessionStorage.token){
      checktoken(sessionStorage.token).then((res) => {
        if(res.data.code == 1){
          alert(res.msg)
          this.$router.push('/login')
        }else if(res.data.code == 0){
          next()
        }
      })
    }else{
      next('/login')
    }
  }
})

export default router
