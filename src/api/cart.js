// 封装购物车相关的API函数
import request from '@/utils/request'

/**
 * 获取商品的 最新价格  库存  是否有效
 */
export const getNewCartGoods = (skuId) => {
  return request(`/goods/stock/${skuId}`, 'get')
}

/**
 *  获取商品对应的sku数据
 */
export const getGoodsSku = (skuId) => {
  return request(`/goods/sku/${skuId}`, 'get')
}

/**
 * 合并购物车
 */
export const mergeCart = (cartList) => {
  return request('/member/cart/merge', 'post', cartList)
}

/**
 * 获取购物车列表
 */
export const findCart = () => {
  return request('/member/cart', 'get')
}

/**
 * 加入购物车
 */
export const insertCart = ({ skuId, count }) => {
  return request('/member/cart', 'post', { skuId, count })
}

/**
 * 删除购物车商品，支批量
 */
export const deleteCart = (ids) => {
  return request('/member/cart', 'delete', { ids })
}

/**
 * 修改购物车商品（状态，数量）
 */
export const updateCart = ({ skuId, selected, count }) => {
  return request(`/member/cart/${skuId}`, 'put', { selected, count })
}

/**
 * 全部选中&取消全选
 */
export const checkAllCart = ({ selected, ids }) => {
  return request('/member/cart/selected', 'put', { selected, ids })
}
