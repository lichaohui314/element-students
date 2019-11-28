import axios from 'axios'
const url = 'http://127.0.0.1:8888'

// 用户登录
export const adminLogin = (admin) => {
  return axios.post(url + '/adminlogin', { ...admin })
}
// 添加用户
export const addAdmin = (admin) => {
  return axios.post(url + '/addadmin', { ...admin })
}
// 用户修改
export const modifyAdmin = (admin) => {
  return axios.post(url + '/modifyadmin', { ...admin })
}

// 获取所有学生
export const getAll = () => {
  return axios.get(url + '/allstudent')
}
// 增加学生
export const addStuend = (stuval) => {
  return axios.post(url + '/addstudent', { ...stuval })
}
// 删除学生
export const delStudent = (_id) => {
  return axios.post(url + '/delstudent', { _id })
}
// 按条件查询
export const queryStudent = (_id) => {
  return axios.post(url + '/querystudent', { _id })
}
// 修改学生信息
export const modifyStudent = (_id, stuval) => {
  return axios.post(url + '/modifystudent', { _id, stuval })
}

// 获取班级列表
export const allClass = () => {
  return axios.post(url + '/allnewclass')
}
// 添加班级
export const addClass = (val) => {
  return axios.post(url + '/addclass', { ...val })
}
// 删除班级
export const delClass = (_id) => {
  return axios.post(url + '/delclass', { _id })
}
// 按 id 查找列表
export const queryClass = (_id) => {
  return axios.post(url + '/queryclass', { _id })
}
