import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
const actions = {
  // 请求登陆
  async login({ commit }, data) {
    const result = await login(data)
    // axios默认加了一层data(success为true表示成功)
    // 响应拦截器已经结构并处理(成功的话返回一个data) 就是目前的result
    commit('SETTOKEN', result) // result存储的是token
    setTimeStamp() // 存储当前时间(处理token过期)
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    const result = await getUserInfo() // 获取用户信息
    const baseInfo = await getUserDetailById(result.userId) // 获取头像(需要传递用户id用的其他接口)
    const baseResult = { ...result, ...baseInfo } // 把两个合并在一起
    commit('SETUSERINFO', baseResult)
    return result // 这个返回值权限控制会用到(这里只用到result的数据)
  },
  // 退出登陆
  logout({ commit }) {
    commit('REMOVETOKEN') // 删除token
    commit('REMOVEUSERINFO') // 删除用户资料
  }
}
const mutations = {
  // 存储token
  SETTOKEN(state, token) {
    state.token = token // Vuex存储token
    setToken(token) // token存储到本地
  },
  // 删除token
  REMOVETOKEN(state) {
    state.token = null // Vuex删除token
    removeToken() // 本地删除token
  },
  // 用户信息
  SETUSERINFO(state, baseResult) {
    state.userInfo = baseResult // 存储到Vuex
  },
  // 删除用户信息(退出登陆)
  REMOVEUSERINFO(state) {
    state.userInfo = {}
  }
}

const state = {
  token: getToken(), // token
  userInfo: {} // 用户信息
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

