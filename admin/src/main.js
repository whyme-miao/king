import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

import './assets/css/global.css'

Vue.config.productionTip = false

import http from './http'
Vue.prototype.$http = http

// Vue.mixin()可设置每一Vue实例都拥有的那些属性或方法
Vue.mixin({
  computed: {
    uploadUrl(){
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeader() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
