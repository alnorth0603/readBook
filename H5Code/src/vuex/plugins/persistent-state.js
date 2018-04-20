/**
 * 持久化插件 约定types以"$$"结尾的，需要持久化到localStorage
 * @param store
 */

const identifier = '$$'

export default function (store) {
  // 当 store 初始化后调用
  store.subscribe((mutation, state) => {
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
    let {type, payload} = mutation
    console.log('persistent-state', type)
    if (type.endsWith(identifier)) {
      window.localStorage.setItem(type, JSON.stringify(payload))
    }
  })
}
