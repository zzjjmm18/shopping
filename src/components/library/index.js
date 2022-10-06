import defaultImg from '@/assets/images/200.png'
import ShopSkeleton from './shop-skeleton.vue'
import ShopCarousel from './shop-carousel.vue'
import ShopMore from './shop-more.vue'

export default {
  install (app) {
    app.component(ShopSkeleton.name, ShopSkeleton) // 注册骨架效果组件
    app.component(ShopCarousel.name, ShopCarousel) // 注册轮播图组件
    app.component(ShopMore.name, ShopMore) // 注册面板组件
    defineDirective(app) // 图片懒加载
  }
}

// 定义指令
const defineDirective = (app) => {
  // 图片懒加载指令 v-lazy
  app.directive('lazy', {
    mounted (el, binding) {
      // 创建一个对象，观察当前使用指令的元素
      const observe = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 停止观察
          observe.unobserve(el)
          // 把指令的值设置给el的src属性
          // 处理图片加载失败 error 图片加载失败的事件 load 图片加载成功
          el.onerror = () => {
            // 加载失败，设置默认图
            el.src = defaultImg
          }
          el.src = binding.value
        }
      }, {
        threshold: 0
      })
      // 开启观察
      observe.observe(el)
    }
  })
}
