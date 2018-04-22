<template>
  <div>
    <div class="home">
      <swiper :list="listData" auto height="180px" dots-position="center" ></swiper>
      <div class="grid">
        <grid :show-lr-borders="false" :show-vertical-dividers="false">
          <grid-item @on-item-click="goToHerf('1')">
            <img slot="icon" src="../assets/home/icon_start_recorder.png">
            <span slot="label">开始记录</span>
          </grid-item>
          <grid-item @on-item-click="goToHerf('2')">
            <img slot="icon" src="../assets/home/icon_good_books.png">
            <span slot="label">好书严选</span>
          </grid-item>
          <grid-item @on-item-click="goToHerf('3')">
            <img slot="icon" src="../assets/home/icon_book_test.png">
            <span slot="label">书籍测试</span>
          </grid-item>
        </grid>
        <grid :show-lr-borders="false" :show-vertical-dividers="false">
          <grid-item link="/login">
            <img slot="icon" src="../assets/home/icon_bound_student.png">
            <span slot="label">绑定学生</span>
          </grid-item>
          <grid-item @on-item-click="goToHerf('5')">
            <img slot="icon" src="../assets/home/icon_busine_cooperate.png">
            <span slot="label">商务合作</span>
          </grid-item>
          <grid-item @on-item-click="goToHerf('6')">
            <img slot="icon" src="../assets/home/icon_about_us.png">
            <span slot="label">关于我们</span>
          </grid-item>
        </grid>
      </div>
      <flexbox orient="vertical" :gutter="0">
        <flexbox-item>
          <div class="middel_banner">
            <img style="display:block;" height="100%" width="100%" src="../assets/home/middel_banner.png" />
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="rb-panel">
            <div class="rb-panel__bd">
              <div @click='articleDetail(item)' v-for='(item,index) in articleData' class="rb-media-box">
                <div class="rb-media-box_appmsg">
                  <div class="rb-media-box__hd">
                    <img :src="item.ArticleImg" alt="" class="rb-media-box__thumb">
                  </div>
                  <div class="rb-media-box__bd">
                    <div class="rb-media-box__title">{{ item.ArticleTitle }}</div>
                    <div class="rb-media-box__time">{{ item.CreateDate }}</div>
                    <div class="rb-media-box__desc">
                      {{ item.ArticleContent }}
                      <!-- <span>阅读量：{{ item.readCount }}</span><span class="icon-xin">{{ item.xinCount }}</span> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Grid, GridItem, Swiper, SwiperItem, Divider } from 'vux'
import { mapGetters } from 'vuex'

export default {
  components: {
    Divider,
    Flexbox,
    FlexboxItem,
    Grid,
    GridItem,
    Swiper,
    SwiperItem
  },
  computed: {
    ...mapGetters(['userInfo$$'])
  },
  methods: {
    onItemClick () {
      console.log('on item click')
    },
    onImgError (item, $event) {
      console.log(item, $event)
    },
    goToHerf (id) {
      switch (id) {
        case '1':
          if (this.userInfo$$ === null) {
            this.$router.push({path: '/login', query: {redirect: '/browse/readyrecord'}})
          } else {
            this.$router.push({path: '/browse/readyrecord'})
          }
          break
        case '3':
          if (this.userInfo$$ === null) {
            this.$router.push({path: '/login', query: {redirect: '/browse/checkout'}})
          } else {
            this.$router.push({path: '/browse/checkout'})
          }
          break
        default:
          this.$vux.toast.text('暂未开放', 'middle')
          break
      }
    },
    async getListBanner () {
      this.listData = []
      let result = await this.request({
        method: 'post',
        data: {
          request_method: 'get_carousel_list'
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
    async getListArticle () {
      this.listData = []
      let result = await this.request({
        method: 'post',
        data: {
          request_method: 'get_article_list'
        },
        tag: 'get_article_list'
      })
      if (result.response_status === 1) {
        this.articleData = result.Article_List
      }
    },
    articleDetail (obj) {
      window.location.href = obj.ArticleUrl
    }
  },
  data () {
    return {
      listData: [ ],
      articleData: [ ]
    }
  },
  created () {
    this.getListBanner()
    this.getListArticle()
  }
}
</script>
<style>
  .home .grid .weui-grid__icon{
    width: 70px;
    height: 70px;
  }
  .home .vux-slider > .vux-indicator > a > .vux-icon-dot{
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #FFFFFF;
  }
  .home .vux-slider > .vux-indicator > a > .vux-icon-dot.active{
    background-color: #EA2C06;
  }
</style>

<style scoped>
  .grid{
    background-color: #FFFFFF;
    margin-top: 10px;
  }
  .grid .weui-grids:before,
  .grid .weui-grid:after{
    height: 0;
    border: 0;
  }
  .rb-panel{
    background-color: #FFFFFF;
    margin-top: 10px;
    position: relative;
    overflow: hidden;
  }
  .rb-panel:first-child{
    margin-top: 0;
  }
  .rb-panel:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #E5E5E5;
    color: #E5E5E5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  .rb-media-box {
    padding: 10px;
    position: relative;
    margin-top: 10px;
  }
  .rb-media-box_appmsg {  
    position: relative;
  }
  .rb-media-box_appmsg .rb-media-box__hd {
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    display: inline-block;
  }
  .rb-media-box_appmsg .rb-media-box__bd {
    position: absolute;
    top: 0;
    left: 65px;
  }
  .rb-media-box_appmsg .rb-media-box__thumb {
    width: 100%;
    max-height: 100%;
    vertical-align: top;
    border-radius: 8px;
  }
  .rb-media-box__title{
    font-size: 15px;
    line-height: 1.3;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    padding-right: 75px;
  }
  .rb-media-box__time{
    color: #999999;
    font-size: 12px;
    position: absolute;
    top: 0;
    right: 0;
  }
  .rb-media-box__desc {
    color: #999999;
    font-size: 13px;
    margin-top: 5px;
  }
  .icon-xin{
    margin-left: 20px;
  }
  .icon-xin::before{
    content: '';
    background: url(../assets/home/icon_xin.png) center center no-repeat;
    width: 17px;
    height: 17px;
    display: inline-block;
    background-size: cover;
    vertical-align: sub;
  }
</style>
