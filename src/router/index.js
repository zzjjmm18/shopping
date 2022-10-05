import { createRouter, createWebHashHistory } from 'vue-router'

const routes = []

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由前置导航守卫
router.beforeEach((to, from, next) => {})

export default router
