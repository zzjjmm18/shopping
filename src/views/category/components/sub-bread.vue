<template>
  <ShopBread>
    <ShopBreadItem to="/">首页</ShopBreadItem>
    <ShopBreadItem
      :key="category.top.id"
      v-if="category.top"
      :to="`/category/${category.top.id}`"
      >{{ category.top.name }}</ShopBreadItem
    >
    <Transition name="fade-right" mode="out-in">
      <ShopBreadItem v-if="category.sub" :key="category.sub.id">{{
        category.sub.name
      }}</ShopBreadItem>
    </Transition>
  </ShopBread>
</template>
<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
export default {
  name: 'SubBread',
  setup () {
    // 获取二级分类的ID
    const route = useRoute()
    // 获取vuex中的类目数据
    const store = useStore()
    // 二级类目的名称和ID，一级类目的名称和ID
    const category = computed(() => {
      const cate = {}
      store.state.category.list.forEach((top) => {
        if (top.children) {
          const sub = top.children.find((sub) => sub.id === route.params.id)
          if (sub) {
            // 设置二级类目
            cate.top = { id: top.id, name: top.name }
            // 设置一级类目
            cate.sub = { id: sub.id, name: sub.name }
          }
        }
      })
      return cate
    })
    // 返回模版所需数据
    return { category }
  }
}
</script>
<style scoped lang="less"></style>
