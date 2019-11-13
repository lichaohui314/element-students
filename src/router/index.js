import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/*
 * 注意: 子菜单只在路由子菜单时出现。长度> = 1
 * 参考网址: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为true，项目将不会显示在侧栏中(默认为false)
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果不设置alwaysShow, 当项目有多个子路由时，它将成为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置noRedirect，则不会在面包屑中重定向
 * name:'router-name'             该名称由<keep alive>使用（必须设置！!!)
 * meta : {
    roles: ['admin','editor']    控制页面角色(可以设置多个角色)
    title: 'title'               名称显示在侧边栏和面包屑(推荐集)
    icon: 'svg-name'             图标显示在侧栏中
    breadcrumb: false            如果设置为false，则该项将隐藏在breadcrumb中(默认为true)
    activeMenu: '/example/list'  如果设置路径，侧栏将突出显示您设置的路径
  }
 */

/**
* constantRoutes
* 没有权限要求的基本页
* 所有角色都可以访问
* 不需要动态判断权限的路由
*/
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }
]
export const asyncRoutes = [
  {
    path: '/addadmin',
    component: Layout,
    children: [
      {
        path: '/addadmin',
        name: 'Addadmin',
        component: () => import('@/views/addadmin/index'),
        meta: { title: '添加用户', icon: 'form', roles: ['5'] }
      }
    ]
  },
  {
    path: '/teacher',
    component: Layout,
    children: [
      {
        path: '/teacher',
        name: 'Teacher',
        component: () => import('@/views/teacher/index'),
        meta: { title: '教师', icon: 'table' }
      }
    ]
  },
  {
    path: '/student',
    component: Layout,
    redirect: '/student/stulist',
    meta: { title: '学生', icon: 'table' },
    children: [
      {
        path: 'stuList',
        name: 'Stulist',
        component: () => import('@/views/student/stulist/index'),
        meta: { title: '所有学生', icon: 'table' }
      },
      {
        path: 'stuoper',
        name: 'Stuoper',
        component: () => import('@/views/student/stuoper/index'),
        meta: { title: '添加学生', icon: 'form', roles: ['5', '1'] }
      }
    ]
  },
  {
    path: '/class',
    component: Layout,
    redirect: '/class/allclass',
    name: 'Class',
    meta: {
      title: '班级',
      icon: 'table'
    },
    children: [
      {
        path: 'allclass',
        component: () => import('@/views/class/allclass/index'), // Parent router-view
        name: 'Allclass',
        meta: { title: '所有班级', icon: 'table' }
      },
      {
        path: 'addclass',
        component: () => import('@/views/class/addclass/index'),
        name: 'Addclass',
        meta: { title: '添加班级', icon: 'form', roles: ['5', '1'] }
      }
    ]
  },
  {
    path: '/stumodify',
    component: () => import('@/views/student/stumodify'),
    hidden: true,
    meta: { roles: ['5', '1'] }
  },
  {
    path: '/modifyclass',
    component: () => import('@/views/class/modifyclass'),
    hidden: true,
    meta: { roles: ['5', '1'] }
  },
  {
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/zh/guide/',
        meta: { title: '前往admin官网', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  // mode: 'history', // 需要服务支持
  scrollBehavior: () => ({ y: 0 }),
  mode: 'history',
  routes: constantRoutes
})

const router = createRouter()

// 重置路由
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
