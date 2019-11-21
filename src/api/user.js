import request from '@/utils/request'
// import axios from 'axios'
const url = 'http://127.0.0.1:8888'
// 登录
export function login(data) {
  return request({
    url: url + '/adminlogin',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getInfo(token) {
  return request({
    url: url + '/admintoken',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
