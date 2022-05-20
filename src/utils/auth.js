import Cookies from 'js-cookie'

const TokenKey = 'incaves-token-user'
const timeKey = 'incaves-timer'
// 读取token
export function getToken() {
  return Cookies.get(TokenKey)
}
// 存储token
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
// 删除token
export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 读取事件戳
export function getTimeStamp() {
  return Cookies.get(timeKey)
}
// 存储时间戳
export function setTimeStamp() {
  return Cookies.set(timeKey, Date.now())
}
