import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('@/views/layout')

const Home = () => import('@/views/home')
const TopCategory = () => import('@/views/category/index')
const SubCategory = () => import('@/views/category/sub')
const Goods = () => import('@/views/goods/index')

// 路由规则
const routes = [
  // 一级路由布局容器
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory },
      { path: '/product/:id', component: Goods }
    ]
  }
]

const router = createRouter({
  // hash的路由模式
  history: createWebHashHistory(),
  routes,
  // 切换路由时滚动到页面顶部
  scrollBehavior () {
    return { left: 0, top: 0 }
  }
})

export default router
