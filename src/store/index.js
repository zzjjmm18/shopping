import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate' // 数据持久化插件

import user from './modules/user'
import cart from './modules/cart'
import category from './modules/category'

export default createStore({
  // vuex的计算属性
  getters: {
  },
  // 模块
  modules: {
    user,
    cart,
    category
  },
  plugins: [
    createPersistedstate({
      key: 'shopping-pc-store',
      paths: ['user', 'cart', 'category']
    })
  ]
})
