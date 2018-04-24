import Vue from 'vue'
import VueRouter from 'vue-router'

/**
 *  加载模块
 */
Vue.use(VueRouter)
/**
 *  路由配置
 */
const router = new VueRouter({
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['@/components/home'], resolve)
    },
    {
      path: '/setting',
      name: 'setting',
      meta: {requireAuth: true},
      component: resolve => require(['@/components/setting'], resolve)
    },
    {
      path: '/browse/home',
      name: 'browse',
      component: resolve => require(['@/components/browse/home'], resolve)
    },
    {
      path: '/browse/analyse',
      name: 'analyse',
      meta: {requireAuth: true},
      component: resolve => require(['@/components/analyse'], resolve)
    }, {
      path: '/browse/classfellow',
      name: 'classfellow',
      meta: {requireAuth: true},
      component: resolve => require(['@/components/classfellow'], resolve)
    }, {
      path: '/browse/history',
      name: 'history',
      meta: {requireAuth: true},
      component: resolve => require(['@/components/history'], resolve)
    }, {
      path: '/browse/readyhistory',
      name: 'readyhistory',
      meta: {requireAuth: true},
      component: resolve => require(['@/components/readyhistory'], resolve)
    }, {
      path: '/browse/readyrecord',
      name: 'readyrecord',
      meta: {requireAuth: true},
      component: resolve => require(['@/components/readyrecord'], resolve)
    }, {
      path: '/browse/checkout',
      name: 'index',
      meta: {requireAuth: true},
      component: resolve => require(['@/components/checkout/index'], resolve)
    }, {
      path: '/browse/checkout/flow/:id',
      name: 'flow',
      meta: {requireAuth: true},
      component: resolve => require(['@/components/checkout/flow'], resolve)
    }, {
      path: '/browse/checkout/finish/:id',
      name: 'finish',
      meta: {requireAuth: true},
      component: resolve => require(['@/components/checkout/finish'], resolve)
    }, {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/login'], resolve)
    }
  ]
})

/**
 *  路由出口
 */
export default router
