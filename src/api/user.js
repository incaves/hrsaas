import request from '@/utils/request'
// 登陆
export function login(data) {
  return request({
    method: 'POST',
    url: '/sys/login',
    data
  })
}
// 获取用户信息
export function getUserInfo() {
  return request({
    method: 'POST',
    url: '/sys/profile'
  })
}
// 退出登陆
export function logout() {
  return request({
  })
}
/**
 * 获取用户的基本信息  现在写它 完全是为了显示头像
 * **/
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
