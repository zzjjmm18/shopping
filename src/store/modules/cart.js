// 购物车状态
import {
  checkAllCart,
  deleteCart,
  findCart,
  getNewCartGoods,
  insertCart,
  mergeCart,
  updateCart
} from '@/api/cart'

// 购物车模块
export default {
  namespaced: true,
  // 数据
  state () {
    return {
      // 购物车商品列表
      list: []
    }
  },
  getters: {
    // 有效商品列表
    validList (state) {
      return state.list.filter((goods) => goods.stock > 0 && goods.isEffective)
    },
    // 有效商品总件数
    validTotal (state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0)
    },
    // 有效商品总金额
    validAmount (state, getters) {
      return (
        getters.validList.reduce(
          (p, c) => p + Math.round(c.nowPrice * 100) * c.count,
          0
        ) / 100
      )
    },
    // 无效商品列表
    invalidList (state) {
      return state.list.filter(
        (goods) => goods.stock <= 0 || !goods.isEffective
      )
    },
    // 已选商品列表
    selectedList (state, getters) {
      return getters.validList.filter((item) => item.selected)
    },
    // 已选商品总件数
    selectedTotal (state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0)
    },
    // 已选商品总金额
    selectedAmount (state, getters) {
      return (
        getters.selectedList.reduce(
          (p, c) => p + Math.round(c.nowPrice * 100) * c.count,
          0
        ) / 100
      )
    },
    // 是否全选
    isCheckAll (state, getters) {
      return (
        getters.validList.length !== 0 &&
        getters.selectedList.length === getters.validList.length
      )
    }
  },
  // 修改数据函数
  mutations: {
    // 加入购物车
    insertCart (state, payload) {
      // 加入购物车字段必须和后端保持一致 即：id skuId name attrsText picture price nowPrice selected stock count isEffective
      // 插入数据规则
      const sameIndex = state.list.findIndex(
        (goods) => goods.skuId === payload.skuId
      )
      if (sameIndex > -1) {
        const count = state.list[sameIndex].count
        payload.count += count
        // 删除原来
        state.list.splice(sameIndex, 1)
      }
      // 追加新的
      state.list.unshift(payload)
    },
    // 修改购物车商品
    updateCart (state, goods) {
      const updateGoods = state.list.find((item) => item.skuId === goods.skuId)
      for (const key in goods) {
        if (
          goods[key] !== undefined &&
          goods[key] !== null &&
          goods[key] !== ''
        ) {
          updateGoods[key] = goods[key]
        }
      }
    },
    // 删除购物车商品
    deleteCart (state, skuId) {
      const index = state.list.findIndex((item) => item.skuId === skuId)
      state.list.splice(index, 1)
    },
    // 设置购物车
    setCart (state, payload) {
      state.list = payload
    }
  },
  // 请求数据函数
  actions: {
    // 合并购物车
    async mergeCart (ctx) {
      // 准备合并的参数
      const cartList = ctx.state.list.map((goods) => {
        return {
          skuId: goods.skuId,
          selected: goods.selected,
          count: goods.count
        }
      })
      await mergeCart(cartList)
      // 合并成功，清空本地购物车
      ctx.commit('setCart', [])
    },
    // 修改规格
    updateCartSku (ctx, { oldSkuId, newSku }) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          const oldGoods = ctx.state.list.find(
            (item) => item.skuId === oldSkuId
          )
          deleteCart([oldGoods.skuId])
            .then(() => {
              return insertCart({ skuId: newSku.skuId, count: oldGoods.count })
            })
            .then(() => {
              return findCart()
            })
            .then((data) => {
              ctx.commit('setCart', data.result)
              resolve()
            })
        } else {
          // 未登录
          const oldGoods = ctx.state.list.find(
            (item) => item.skuId === oldSkuId
          )
          ctx.commit('deleteCart', oldSkuId)
          const {
            skuId,
            price: nowPrice,
            specsText: attrsText,
            inventory: stock
          } = newSku
          const newGoods = { ...oldGoods, skuId, nowPrice, attrsText, stock }
          ctx.commit('insertCart', newGoods)
          resolve()
        }
      })
    },
    // 批量删除
    batchDeleteCart (ctx, isClear) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          const ids = ctx.getters[isClear ? 'invalidList' : 'selectedList'].map(
            (item) => item.skuId
          )
          deleteCart(ids)
            .then(() => {
              return findCart()
            })
            .then((data) => {
              ctx.commit('setCart', data.result)
              resolve()
            })
        } else {
          // 未登录
          ctx.getters[isClear ? 'invalidList' : 'selectedList'].forEach(
            (item) => {
              ctx.commit('deleteCart', item.skuId)
            }
          )
          resolve()
        }
      })
    },
    // 全选与取消全选
    checkAllCart (ctx, selected) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          const ids = ctx.getters.validList.map((item) => item.skuId)
          checkAllCart({ selected, ids })
            .then(() => {
              return findCart()
            })
            .then((data) => {
              ctx.commit('setCart', data.result)
              resolve()
            })
        } else {
          // 未登录
          ctx.getters.validList.forEach((goods) => {
            ctx.commit('updateCart', { skuId: goods.skuId, selected })
          })
          resolve()
        }
      })
    },
    // 修改购物车（选中状态，数量）
    updateCart (ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          updateCart(payload)
            .then(() => {
              return findCart()
            })
            .then((data) => {
              ctx.commit('setCart', data.result)
              resolve()
            })
        } else {
          // 未登录
          ctx.commit('updateCart', payload)
          resolve()
        }
      })
    },
    // 删除购物车
    deleteCart (ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          deleteCart([payload])
            .then(() => {
              return findCart()
            })
            .then((data) => {
              ctx.commit('setCart', data.result)
              resolve()
            })
        } else {
          // 未登录
          ctx.commit('deleteCart', payload)
          resolve()
        }
      })
    },
    // 加入购物车
    insertCart (ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          insertCart({ skuId: payload.skuId, count: payload.count })
            .then(() => {
              return findCart()
            })
            .then((data) => {
              ctx.commit('setCart', data.result)
              resolve()
            })
        } else {
          // 未登录
          ctx.commit('insertCart', payload)
          resolve()
        }
      })
    },
    // 获取商品列表
    findCart (ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          findCart().then((data) => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          // 未登录
          const promiseArr = ctx.state.list.map((goods) => {
            return getNewCartGoods(goods.skuId)
          })
          Promise.all(promiseArr).then((dataList) => {
            // 更新本地购物车
            dataList.forEach((data, i) => {
              ctx.commit('updateCart', {
                skuId: ctx.state.list[i].skuId,
                ...data.result
              })
            })
            // 调用resolve代表操作成功
            resolve()
          })
        }
      })
    }
  }
}
