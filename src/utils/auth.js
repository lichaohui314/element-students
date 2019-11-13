// import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

// 获取 cookie,确定是否登录
// export function getToken() {
//   return Cookies.get(TokenKey)
// }

// // 写入一个 cookie,表示已经登录
// export function setToken(token) {
//   console.log(token)
//   return Cookies.set(TokenKey, token)
// }

// // 退出登录,删除cookie
// export function removeToken() {
//   return Cookies.remove(TokenKey)
// }

// 获取 TokenKey 信息
export function getToken() {
  return localStorage.getItem(TokenKey)
}

// 设置 TokenKey 信息
export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

// 移除 TokenKey 信息
export function removeToken() {
  return localStorage.removeItem(TokenKey)
}
