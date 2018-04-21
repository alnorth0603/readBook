import axios from 'axios'

export default {
  install (Vue) {
    Vue.prototype.request = request
  }
}

export const request = function (method, url, data, tag) {
  if (typeof method === 'object') {
    url = '/InterfaceService/CwInterface.aspx'
    data = method.data
    tag = method.tag  // loading的字段标识
    method = method.method || 'get'
  }
  const needLoading = tag
  if (needLoading) {
    this.$store.commit('UPDATE_LOADING_STATUS', {isLoading: true})
  }
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      data: data,
      'Content-Type': 'application/json',
      timeout: 60000
    }).then((response) => {
      let resData = response.data
      if (resData.response_status !== 1) {
        this.$vux.toast.text(resData.response_msg, 'middle')
      }
      if (needLoading) {
        this.$store.commit('UPDATE_LOADING_STATUS', {isLoading: false})
      }
      resolve(response.data)
    }, (err) => {
      var self = this
      // 清除loading
      if (needLoading) {
        self.$store.commit('UPDATE_LOADING_STATUS', {isLoading: false})
      }
      // 超时处理
      if (err.code === 'ECONNABORTED') {
        this.$vux.toast.text('请求超时，请稍后再试', 'middle')
        return
      }
      switch (err.response && err.response.status) {
        case 401:
        case 600:
          this.$router.push({
            path: '/login',
            query: {redirect: this.$route.fullPath}
          })
          break
      }
    })
  })
}
