import { createVNode, render } from 'vue'
import ShopConfirm from './shop-confirm.vue'

// 准备一个DOM
const div = document.createElement('div')
div.setAttribute('class', 'xtx-confirm-container')
document.body.appendChild(div)

// 返回的是promise对象，点取消销毁组件，点确认销毁组件
export default ({ title, text }) => {
  return new Promise((resolve, reject) => {
    // 点击取消触发的函数
    const cancelCallback = () => {
      render(null, div)
      reject(new Error('点击取消'))
    }
    // 点击确认触发的函数
    const submitCallback = () => {
      render(null, div)
      resolve()
    }

    const vn = createVNode(ShopConfirm, {
      title,
      text,
      cancelCallback,
      submitCallback
    })
    render(vn, div)
  })
}
