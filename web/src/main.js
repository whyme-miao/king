import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


import './assets/iconfont/iconfont.css'
import './assets/scss/style.scss'
import router from './router'
// 引入swiper第三方插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
// 引入card组件
import card from './components/Card.vue'
Vue.component('m-card', card)

import ListCard from './components/ListCard.vue'
Vue.component('m-list-card', ListCard)

// 引入axios
import axios from 'axios'
Vue.prototype.$http = axios.create({

  // baseURL: 'http://localhost:3000/web/api'
  baseURL: process.env.VUE_APP_API_URL || '/web/api'
})





new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
