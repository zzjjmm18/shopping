<script>
import { h } from 'vue'
export default {
  name: 'ShopBread',
  render () {
    const items = this.$slots.default()
    const dymanicItems = []
    items.forEach((item, i) => {
      // 对插槽节点进行判断
      if (
        item.type.name === 'ShopBreadItem' ||
        item.type.displayName === 'Transition'
      ) {
        dymanicItems.push(item)
        if (i < items.length - 1) {
          dymanicItems.push(h('i', { class: 'iconfont icon-angle-right' }))
        }
      }
    })
    return h('div', { class: 'shop-bread' }, dymanicItems)
  }
}
</script>

<style lang="less">
.shop-bread {
  display: flex;
  padding: 25px 10px;

  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
