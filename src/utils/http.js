import axios from 'axios'
import router from '@/router'
import store from '@/store'
import {
  Message
} from 'element-ui'

const http = axios.create({
  baseURL: 'api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

http.interceptors.request.use(config => {
  const token = store.getters['user/getToken']
  if (config.url !== '/login' && token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
}, err => {
  return Promise.reject(err)
})

http.interceptors.response.use(res => {
  if (res.data.code === 401) {
    router.push({
      name: 'login'
    })
  }
  return res
}, err => {
  const res = err.response
  if (res.status === 401) {
    store.dispatch('user/remove_Token')
    Message.error('超时退出，请重新登录')
    router.push({
      name: 'login'
    })
  } else if (res.status === 500) {
    Message.error('服务器出错，请稍后尝试')
  }
  return Promise.reject(err)
})

export default http
