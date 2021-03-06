import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
    // baseURL: 'http://localhost:3000/admin/api'
    baseURL: process.env.VUE_APP_API_URL || '/admin/api',
})

// 拦截请求
http.interceptors.request.use(config => {
    // 注意 前端Authorization是大写，后端authorization是小写，自动匹配
    if(localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config
}, err => {
    return Promise.reject(err)
})

// 拦截请求
http.interceptors.response.use(res => {
    return res
}, err => {
    if(err.response.data.message) {
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })
    }
    if(err.response.status === 401) {
        router.push('/login')
    }
    
    return Promise.reject(err)
})

export default http