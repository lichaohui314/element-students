import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

// 获取 cookie,确定是否登录
export function getToken() {
  return Cookies.get(TokenKey)
}

// 写入一个 cookie,表示已经登录
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

// 退出登录,删除cookie
export function removeToken() {
  return Cookies.remove(TokenKey)
}
