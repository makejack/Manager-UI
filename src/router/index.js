import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout'

Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'login',
  component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
}, {
  path: '/404',
  component: () => import( /* webpackChunkName: "404" */ '../views/404.vue')
}]

/*
  hidden: true
  hiddenChildren: true
  meta: {
    title: 'title',
    icon: 'icon',
    roles: ['role','role']
  }
*/

export const asyncRoutesMap = [{
  path: '/',
  component: Layout,
  hiddenChildren: true,
  meta: {
    title: '首页',
    icon: 'el-icon-s-home'
  },
  children: [{
      path: '',
      name: 'home',
      component: () => import( /* webpackChunkName: "home" */ '../views/Home.vue')
    },
    {
      path: '/modifypassword',
      name: 'modify-password',
      component: () => import( /* webpackChunkName: "modify-password" */ '../views/ModifyPassword.vue')
    }
  ]
}, {
  path: '/traffice',
  component: Layout,
  hiddenChildren: true,
  meta: {
    title: '流量明细',
    icon: 'el-icon-sort'
  },
  children: [{
    path: '',
    name: 'traffice',
    component: () => import( /* webpackChunkName: "traffice" */ '../views/Traffice.vue')
  }]
}, {
  path: '/client-no',
  component: Layout,
  hiddenChildren: true,
  meta: {
    title: '客户编号',
    icon: 'el-icon-s-custom'
  },
  children: [{
    path: '',
    name: 'client-no',
    component: () => import( /* webpackChunkName: "client-number" */ '../views/ClientNo.vue')
  }]
}, {
  path: '/transfers',
  component: Layout,
  hiddenChildren: true,
  meta: {
    title: '分账明细',
    icon: 'el-icon-money'
  },
  children: [{
    path: '',
    name: 'transfers',
    component: () => import( /* webpackChunkName: "transfers" */ '../views/Transfers.vue')
  }]
}, {
  path: '/logger',
  component: Layout,
  hiddenChildren: true,
  meta: {
    title: '系统日志',
    icon: 'el-icon-s-order'
  },
  children: [{
      path: '',
      name: 'logger',
      component: () => import( /* webpackChunkName: "logger" */ '../views/Logger.vue')
    },
    {
      path: '/logger/view',
      name: 'view-logger',
      component: () => import( /* webpackChunkName: "view-logger" */ '../views/ViewLogger.vue')
    }
  ]
}, {
  path: '/lite-app',
  redirect: '/lite-app/banner',
  component: Layout,
  meta: {
    title: '小程序管理',
    icon: 'el-icon-chat-line-round'
  },
  children: [{
    path: '/lite-app/banner',
    name: 'banner',
    component: () => import( /* webpackChunkName: "Banner" */ '../views/Banner.vue'),
    meta: {
      title: '上传横幅'
    }
  }, {
    path: '/lite-app/company-profile',
    name: 'companyProfile',
    component: () => import( /* webpackChunkName: "Company-Profile" */ '../views/CompanyProfile.vue'),
    meta: {
      title: '公司简介'
    }
  }]
}, {
  path: '/admin',
  redirect: '/admin/list',
  component: Layout,
  meta: {
    title: '设置',
    icon: 'el-icon-setting'
  },
  children: [{
      path: '/admin/list',
      name: 'admin',
      component: () => import( /* webpackChunkName: "admin" */ '../views/Admin.vue'),
      meta: {
        title: '管理员列表'
      }
    },
    {
      path: '/admin/login-logger',
      name: 'login-logger',
      component: () => import( /* webpackChunkName: "login-logger" */ '../views/LoginLogger.vue'),
      meta: {
        title: '登录日志'
      }
    },
    {
      path: '/admin/role',
      name: 'role',
      component: () => import( /* webpackChunkName: "role" */ '../views/Role.vue'),
      meta: {
        title: '角色管理',
        roles: ['admin']
      }
    }
  ]
}, {
  path: '*',
  redirect: '/404',
  hidden: true
}]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
