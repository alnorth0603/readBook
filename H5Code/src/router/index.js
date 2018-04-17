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
      path: '/bindstudent',
      name: 'bindstudent',
      component: resolve => require(['@/components/bindstudent'], resolve)
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
      path: '/analyse',
      name: 'analyse',
      component: resolve => require(['@/components/analyse'], resolve)
    }, {
      path: '/classfellow',
      name: 'classfellow',
      component: resolve => require(['@/components/classfellow'], resolve)
    }, {
      path: '/history',
      name: 'history',
      component: resolve => require(['@/components/history'], resolve)
    }, {
      path: '/readyhistory',
      name: 'readyhistory',
      component: resolve => require(['@/components/readyhistory'], resolve)
    }, {
      path: '/readyrecord',
      name: 'readyrecord',
      component: resolve => require(['@/components/readyrecord'], resolve)
    }, {
      path: '/checkout/index',
      name: 'index',
      component: resolve => require(['@/components/checkout/index'], resolve)
    }, {
      path: '/checkout/flow',
      name: 'flow',
      component: resolve => require(['@/components/checkout/flow'], resolve)
    }, {
      path: '/checkout/finish',
      name: 'finish',
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
