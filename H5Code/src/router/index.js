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
  likActiveClass: 'link-active',
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
    }
    // {
    //   path: '/init',
    //   name: 'init',
    //   component: resolve => require(['../components/init.vue'], resolve),
    //   children: [
    //     {
    //       path: 'personal/userInfo',
    //       name: 'userInfo',
    //       component: resolve => require(['@/components/personal/userInfo.vue'], resolve),
    //       meta: {title: '主页'}
    //     },
    //     {
    //       path: 'home',
    //       name: 'home',
    //       component: resolve => require(['../components/home.vue'], resolve),
    //       meta: {title: '主页'}
    //     }
    //   ]
    // },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: resolve => require(['../components/login.vue'], resolve),
    //   meta: {title: '登录'}
    // }
  ]
})

/**
 *  路由出口
 */
export default router
