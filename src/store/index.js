import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate' // 数据持久化插件

// 三个模块
import user from './modules/user'
import cart from './modules/cart'
import category from './modules/category'

export default createStore({
  // 模块
  modules: {
    user,
    cart,
    category
  },
  // 配置插件
  plugins: [
    // 默认存储在localStorage
    createPersistedstate({
      key: 'shopping-pc-store',
      paths: ['user', 'cart']
    })
  ]
})
