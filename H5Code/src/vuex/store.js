import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import myPlugins from './plugins'
import {BASE} from './type'

const {UPDATE_USER} = BASE

Vue.use(Vuex)
const plugins = [...myPlugins]

// 不要在发布环境下启用严格模式！
const debug = process.env.NODE_ENV !== 'production'
debug && plugins.push(createLogger())

const shouldUseTransition = !/transition=none/.test(location.href)

const state = {
  userInfo: '',
  isLoading: false,
  direction: shouldUseTransition ? 'forward' : ''
}
export default new Vuex.Store({
  state,
  mutations: {
    [UPDATE_USER] (state, payload) {
      state.userInfo = payload
    },
    UPDATE_LOADING_STATUS (state, payload) {
      state.isLoading = payload.isLoading
    },
    UPDATE_DIRECTION (state, payload) {
      if (!shouldUseTransition) {
        return
      }
      state.direction = payload.direction
    }
  },
  getters: {
    [UPDATE_USER] (state) {
      return state.userInfo || JSON.parse(window.localStorage.getItem(`${UPDATE_USER}`))
    }
  },
  strict: debug,
  plugins
})
