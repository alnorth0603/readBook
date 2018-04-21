<template>
  <div class="browse">
    <swiper :list="listData" auto height="180px" dots-position="center" ></swiper>
    <div class="grid">
      <grid :show-lr-borders="false" :show-vertical-dividers="false">
        <grid-item link="/browse/readyrecord">
          <img slot="icon" src="@/assets/home/icon_start_recorder.png">
          <span slot="label">开始记录</span>
        </grid-item>
        <grid-item link="/browse/history">
          <img slot="icon" src="@/assets/home/icon_good_books.png">
          <span slot="label">历史查看</span>
        </grid-item>
      </grid>
      <grid :show-lr-borders="false" :show-vertical-dividers="false">
        <grid-item link="/browse/classfellow">
          <img slot="icon" src="@/assets/home/icon_bound_student.png">
          <span slot="label">同班同学</span>
        </grid-item>
        <grid-item link="/browse/analyse">
          <img slot="icon" src="@/assets/browse/icon_analyse.png">
          <span slot="label">阅读分析</span>
        </grid-item>
      </grid>
      <grid :show-lr-borders="false" :show-vertical-dividers="false">
        <grid-item link="/browse/readyhistory">
          <img slot="icon" src="@/assets/browse/icon_read_book.png">
          <span slot="label">已读书籍</span>
        </grid-item>
        <grid-item link="/browse/checkout">
          <img slot="icon" src="@/assets/home/icon_book_test.png">
          <span slot="label">书籍测试</span>
        </grid-item>
      </grid>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperItem, Grid, GridItem } from 'vux'
export default {
  components: {
    Grid,
    GridItem,
    Swiper,
    SwiperItem
  },
  data () {
    return {
      listData: [{
        url: 'javascript:',
        img: 'https://static.vux.li/demo/1.jpg'
      }, {
        url: 'javascript:',
        img: 'https://static.vux.li/demo/2.jpg'
      }, {
        url: 'javascript:',
        img: 'https://static.vux.li/demo/1.jpg'
      }]
    }
  }
}
</script>
<style>
  .browse .grid .weui-grid__icon{
    width: 70px;
    height: 70px;
  }
  .browse .vux-slider > .vux-indicator > a > .vux-icon-dot{
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #FFFFFF;
  }
  .browse .vux-slider > .vux-indicator > a > .vux-icon-dot.active{
    background-color: #EA2C06;
  }
</style>
<style scoped>
  .browse .grid{
    background: #FFFFFF;
  }
  .grid .weui-grids:before,
  .grid .weui-grid:after{
    height: 0;
    border: 0;
  }
</style>
