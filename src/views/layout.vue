<template>
  <div class="container">
    <!-- 顶部通栏 -->
    <AppTopnav/>
    <!-- 头部组件 -->
    <AppHeader/>
    <!-- 吸顶头部组件 -->
    <AppHeaderSticky />
    <!-- 内容部分 -->
    <div class="main">
      <!-- 二级路由 -->
      <RouterView />
    </div>
    <!-- 底部组件 -->
     <AppFooter/>
  </div>
</template>

<script>
import AppTopnav from '@/components/app-topnav'
import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'
import AppHeaderSticky from '@/components/app-header-sticky'

import { useStore } from 'vuex'
export default {
  name: 'LayoutPage',
  components: {
    AppTopnav,
    AppHeader,
    AppFooter,
    AppHeaderSticky
  },
  // 获取分类数据
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>
<style scoped lang="less">
.app-body {
  min-height: 600px;
}
</style>
