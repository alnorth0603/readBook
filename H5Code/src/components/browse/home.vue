<template>
  <div>
    <div class="browse">
      <swiper :list="listData" auto height="150px" dots-position="center" ></swiper>
      <div class="grid">
        <grid :show-lr-borders="false" :show-vertical-dividers="false">
          <grid-item @on-item-click="goToHerf('1')">
            <img slot="icon" src="@/assets/home/icon_start_recorder.png">
            <span slot="label">开始记录</span>
          </grid-item>
          <grid-item @on-item-click="goToHerf('2')">
            <img slot="icon" src="@/assets/home/icon_good_books.png">
            <span slot="label">历史查看</span>
          </grid-item>
        </grid>
        <grid :show-lr-borders="false" :show-vertical-dividers="false">
          <grid-item @on-item-click="goToHerf('3')">
            <img slot="icon" src="@/assets/home/icon_bound_student.png">
            <span slot="label">同班同学</span>
          </grid-item>
          <grid-item @on-item-click="goToHerf('4')">
            <img slot="icon" src="@/assets/browse/icon_analyse.png">
            <span slot="label">阅读分析</span>
          </grid-item>
        </grid>
        <grid :show-lr-borders="false" :show-vertical-dividers="false">
          <grid-item @on-item-click="goToHerf('5')">
            <img slot="icon" src="@/assets/browse/icon_read_book.png">
            <span slot="label">已读书籍</span>
          </grid-item>
          <grid-item @on-item-click="goToHerf('6')">
            <img slot="icon" src="@/assets/home/icon_book_test.png">
            <span slot="label">书籍测试</span>
          </grid-item>
        </grid>
      </div>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperItem, Grid, GridItem } from 'vux'
import { mapGetters } from 'vuex'
export default {
  components: {
    Grid,
    GridItem,
    Swiper,
    SwiperItem
  },
  computed: {
    ...mapGetters(['userInfo$$'])
  },
  data () {
    return {
      listData: []
    }
  },
  methods: {
    async getListBanner () {
      this.listData = []
      let result = await this.request({
        method: 'post',
        data: {
          request_method: 'get_carousel_list',
          type: 2
        },
        tag: 'get_carousel_list'
      })
      if (result.response_status === 1) {
        result.Carousel_List.forEach(element => {
          let temData = {}
          temData.url = element.CarouselUrl
          temData.img = element.CarouselImg
          this.listData.push(temData)
        })
      }
    },
    goToHerf (id) {
      switch (id) {
        case '1':
          this.$router.push({path: '/browse/readyrecord', meta: {requireAuth: true}})
          break
        case '2':
          this.$router.push({path: '/browse/history', meta: {requireAuth: true}})
          break
        case '3':
          this.$router.push({path: '/browse/classfellow', meta: {requireAuth: true}})
          break
        case '4':
          this.$router.push({path: '/browse/analyse', meta: {requireAuth: true}})
          break
        case '5':
          this.$router.push({path: '/browse/readyhistory', meta: {requireAuth: true}})
          break
        case '6':
          this.$router.push({path: '/browse/checkout', meta: {requireAuth: true}})
          break
        default:
          this.$vux.toast.text('暂未开放', 'middle')
          break
      }
    }
  },
  created () {
    this.getListBanner()
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
  .grid .weui-grids:before,
  .grid .weui-grid:after{
    height: 0;
    border: 0;
  }
  .grid .weui-grid{
     padding: 5px 10px;
  }
</style>
