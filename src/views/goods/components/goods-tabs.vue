<template>
  <div class="goods-tabs">
    <nav>
      <a
        @click="activeName = 'GoodsDetial'"
        :class="{ active: activeName === 'GoodsDetial' }"
        href="javascript:;"
        >商品详情</a
      >
      <a
        @click="activeName = 'GoodsComment'"
        :class="{ active: activeName === 'GoodsComment' }"
        href="javascript:;"
        >商品评价<span>({{ goods.commentCount }})</span></a
      >
    </nav>
    <!-- 切换内容-->
    <component :is="activeName"></component>
  </div>
</template>
<script>
import { ref, inject } from 'vue'
import GoodsDetial from './goods-detail'
import GoodsComment from './goods-comment'
export default {
  name: 'GoodsTabs',
  components: { GoodsDetial, GoodsComment },
  setup () {
    // activeName的值：GoodsDetial  GoodsComment
    const activeName = ref('GoodsDetial')
    // goods详情数据
    const goods = inject('goods')
    return { activeName, goods }
  }
}
</script>
<style scoped lang="less">
// 主题
@xtxColor: #27ba9b;
// 价格
@priceColor: #cf4444;
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>
