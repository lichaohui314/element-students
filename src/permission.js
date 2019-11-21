import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 从cookie中获取登录信息
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress配置  是否有转圈效果

const whiteList = ['/login', '/register'] // 无重定向白名单

router.beforeEach(async(to, from, next) => {
  // 开始进度条
  NProgress.start()

  // 设置页面标题(左边的路由标题)
  document.title = getPageTitle(to.meta.title)

  // 确定用户是否已登录
  const hasToken = getToken() || ''

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录,往 login 页面跳的时候,重定向到主页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 确定用户是否已通过getInfo获得其权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        // const isLogin = await store.dispatch('user/getInfo')
        next()
      } else {
        try {
          // get user info
          // 注意：角色必须是对象数组例如：['admin']或，['developer'，'editor']
          const { roles } = await store.dispatch('user/getInfo')

          // 基于角色生成可访问路由图
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 动态添加可访问路由
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          // 移除 token 并转到登录页以重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* 没有标记*/

    if (whiteList.indexOf(to.path) !== -1) {
      // 在免费登录白名单中，直接进入
      next()
    } else {
      // 没有访问权限的其他页将重定向到登录页。
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 完成进度条
  NProgress.done()
})
