import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

Vue.use(VueRouter)

const routes = [
  { path:'/login', name:'login', component: Login, meta: {isPublic: true}}, // isPublic为true表示可以公开访问
  {
    path: '/',
    name: 'main',
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue') 懒加载
    component: Main,
    children: [
      {path: '/categories/create', component: CategoryEdit},
      {path: '/categories/edit/:id', component: CategoryEdit, props: true}, // props表示把动态id注入到CategoryEdit页面中
      {path: '/categories/list', component: CategoryList},

      {path: '/items/create', component: ItemEdit},
      {path: '/items/edit/:id', component: ItemEdit, props: true}, 
      {path: '/items/list', component: ItemList},

      {path: '/heroes/create', component: HeroEdit},
      {path: '/heroes/edit/:id', component: HeroEdit, props: true}, 
      {path: '/heroes/list', component: HeroList},

      {path: '/articles/create', component: ArticleEdit},
      {path: '/articles/edit/:id', component: ArticleEdit, props: true}, 
      {path: '/articles/list', component: ArticleList},

      {path: '/ads/create', component: AdEdit},
      {path: '/ads/edit/:id', component: AdEdit, props: true}, 
      {path: '/ads/list', component: AdList},

      {path: '/admin_users/create', component: AdminUserEdit},
      {path: '/admin_users/edit/:id', component: AdminUserEdit, props: true}, 
      {path: '/admin_users/list', component: AdminUserList},
    ]
    
  }
]

const router = new VueRouter({
  mode:'hash',
  routes
})

router.beforeEach((to, from, next) => {
  if(!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }

  next()
})

export default router
