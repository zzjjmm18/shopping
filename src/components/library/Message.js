// 提供一个能够显示shop-message组件的函数
// 这个函数将来：导入直接使用，也可以挂载在vue实例原型上
import { createVNode, render } from 'vue'
import ShopMessage from './shop-message.vue'

// DOM容器
const div = document.createElement('div')
div.setAttribute('class', 'shop-msssage-container')
document.body.appendChild(div)

// 定时器标识
let timer = null

export default ({ type, text }) => {
  // 渲染组件
  // 导入消息提示组件
  const vnode = createVNode(ShopMessage, { type, text })
  // 将虚拟节点渲染到容器中
  render(vnode, div)
  // 销毁组件
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, div)
  }, 3000)
}
