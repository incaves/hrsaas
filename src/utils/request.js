import axios from 'axios'
import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
const TimeOut = 3600 // 定义超时时间
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 随着执行命令而发生变化
  timeout: 5000
})
// 检查当前时间戳是否过期
function CheckTimeOut() {
  // 超时逻辑  (当前时间  - 本地存储中的时间) 是否大于 时间差
  var currentTime = Date.now() // 当前时间
  var timeStamp = getTimeStamp() // 本地存储时间戳(请求登陆时存储的)
  return (currentTime - timeStamp) / 1000 > TimeOut
}
// request interceptor
service.interceptors.request.use(config => {
  // 在这个位置需要统一的去注入token
  if (store.getters.token) {
    // 如果token存在,检查token是否过期 检查时间戳
    if (CheckTimeOut()) {
      // 如果为ture 表示过期了
      store.dispatch('user/logout') // 退出登陆
      router.push('/login') // 跳转到登陆页
      return Promise.reject(new Error('token超时了'))
    }
    // 如果token存在 注入token 给每个请求挂载token
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config // 必须返回配置
}, error => {
  return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use(response => {
  // 处理axios默认包了一层data
  const { success, message, data } = response.data // 处理
  // success 为true表示成功 false为失败
  if (success) {
    // 请求成功的话把数据返回给响应拦截器,继续执行它的任务,把数据继续传递
    return data // data是数据(只返回data数据)(例如登陆接口的data只有token)
  } else {
    // 请求失败的话 不能进入then 直接进入catch
    Message.error(message) // 提示错误消息
    return Promise.reject(new Error(message)) // 人为发现的错误
  }
}, error => {
  // 处理token过期
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 当等于10002的时候 表示 后端告诉我token超时了
    store.dispatch('user/logout') // 登出action 删除token
    router.push('/login')
  } else {
    Message.error(error.message) // 提示错误信息
  }
  // 失败返回给响应拦截器,继续它的任务,把失败的信息传递过去
  // 不进入 then 直接进入 catch
  return Promise.reject(error)
})

export default service
