import ShopSkeleton from './shop-skeleton.vue'
import ShopCarousel from './shop-carousel.vue'

export default {
  install (app) {
    app.component(ShopSkeleton.name, ShopSkeleton) // 注册骨架效果组件
    app.component(ShopCarousel.name, ShopCarousel) // 注册轮播图组件
  }
}
