
import Vue from 'vue'

import App from './App'

import Vuex from 'vuex'
import VueRouter from 'vue-router'
import HttpPlugin from './plugins/http'
import { sync } from 'vuex-router-sync'
import { BusPlugin, ToastPlugin, AppPlugin } from 'vux'
import router from './router'
import store from './vuex/store'

Vue.use(VueRouter)
Vue.use(Vuex)

require('es6-promise').polyfill()

// plugins
Vue.use(HttpPlugin)
Vue.use(BusPlugin)
Vue.use(ToastPlugin, {position: 'top'})

// test
if (process.env.platform === 'app') {
  Vue.use(AppPlugin, store)
}

const FastClick = require('fastclick')
FastClick.attach(document.body)

sync(store, router)

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
let isPush = false
let endTime = Date.now()
let methods = ['push', 'go', 'replace', 'forward', 'back']

document.addEventListener('touchend', () => {
  endTime = Date.now()
})
methods.forEach(key => {
  let method = router[key].bind(router)
  router[key] = function (...args) {
    isPush = true
    method.apply(null, args)
  }
})

router.beforeEach(function (to, from, next) {
  store.commit('UPDATE_LOADING_STATUS', {isLoading: true})
  if (to.meta.requireAuth) {
    if (store.getters['userInfo$$'] === null) {
      next({path: '/login', query: {redirect: to.fullPath}})
    }
  }
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('UPDATE_DIRECTION', {direction: 'forward'})
    } else {
      // 判断是否是ios左滑返回
      if (!isPush && (Date.now() - endTime) < 377) {
        store.commit('UPDATE_DIRECTION', {direction: ''})
      } else {
        store.commit('UPDATE_DIRECTION', { direction: 'reverse' })
      }
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('UPDATE_DIRECTION', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  isPush = false
  store.commit('UPDATE_LOADING_STATUS', {isLoading: false})
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
