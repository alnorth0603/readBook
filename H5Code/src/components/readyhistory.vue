<template>
  <div class="readyhistory">
    <div>
      <masker>
        <div class="m-img" :style="topBg"></div>
        <div slot="content" class="m-title">
          小妹
          <br/>
          八年级四班
        </div>
      </masker>
    </div>
    <div class="pull-scroll">
      <scroller lock-x scrollbar-y use-pullup :pullup-config="pullupConfig2" height="500px" ref="demo2" @on-pullup-loading="load2">
        <div class="box2">
          <flexbox orient="vertical" :gutter="0">
            <template v-for="(value, key, index) in object">
              <flexbox-item :class="(index + 1) % 2 == 0 ? 'active': ''">
                <div class="flexbox-content">
                  <div class="flexbox-left">王乐</div>
                  <div class="flexbox-right">
                    <div class="flexbox-right-top">
                      <flexbox :gutter="0">
                        <flexbox-item :span='6'>
                          <div class="txt-1">10</div>
                          <div class="txt-2">总计页数</div>
                        </flexbox-item>
                        <flexbox-item :span='6'>
                          <div class="txt-1">10</div>
                          <div class="txt-2">平均阅读得分</div>
                        </flexbox-item>
                      </flexbox>
                    </div>
                    <div class="flexbox-right-bottom">
                      <flexbox :gutter="0">
                        <flexbox-item :span='6'>
                          <div class="txt-1">10</div>
                          <div class="txt-2">总计时长</div>
                        </flexbox-item>
                        <flexbox-item :span='6'>
                          <div class="txt-1">10</div>
                          <div class="txt-2">测验得分</div>
                        </flexbox-item>
                      </flexbox>
                    </div>
                  </div>
                </div>
              </flexbox-item>
            </template>
          </flexbox>
        </div>
      </scroller>
    </div>
  </div>
</template>
<script>
import { Masker, Grid, GridItem, Flexbox, FlexboxItem, Scroller } from 'vux'
export default {
  components: {
    Masker,
    Grid,
    GridItem,
    Flexbox,
    FlexboxItem,
    Scroller
  },
  data () {
    return {
      topBg: {
        backgroundImage: 'url(' + require('@/assets/history/rbanner.png') + ')'
      },
      isMoreLoading: false,
      pullupConfig2: {
        content: '上拉加载更多',
        downContent: '松开进行加载',
        upContent: '上拉加载更多',
        loadingContent: '加载中...'
      },
      object: {
        firstName: 'John',
        lastName: 'Doe',
        age: 30
      }
    }
  },
  methods: {
    load2 () {
      setTimeout(() => {
        this.n2 += 10
        setTimeout(() => {
          this.$refs.demo2.donePullup()
        }, 100)
        if (this.n2 === 30) { // unload plugin
          setTimeout(() => {
            this.$refs.demo2.disablePullup()
          }, 100)
        }
      }, 2000)
    }
  }
}
</script>
<style>
  .readyhistory .vux-masker{
    background: transparent !important;
  }
</style>
<style scoped>
  .text-overflow{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }
  .readyhistory{
    height: 100%;
    background-color: #FFFFFF;
  }
  .m-img {
    padding-bottom: 33%;
    display: block;
    position: relative;
    max-width: 100%;
    background-size: cover;
    background-position: center center;
    cursor: pointer;
    border-radius: 2px;
  }

  .m-title {
    color: #fff;
    text-align: center;
    font-weight: 500;
    font-size: 16px;
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
  }
  .flexbox-content{
    position: relative;
    /* border-top: 1px solid #EEEEEE; */
    border-bottom: 1px solid #E0E0E0;
  }
  .flexbox-content .flexbox-left{
    width: 90px;
    height: 100px;
    display: inline-block;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    border-right: 1px solid #E0E0E0;
  }
  .flexbox-content .flexbox-right{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    padding-left: 90px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }
  .flexbox-content .flexbox-right .txt-1{
    font-size:16px;
    text-align: center;
  }
  .flexbox-content .flexbox-right .txt-2{
    font-size:12px;
    text-align: center;
  }
  .flexbox-content .flexbox-right>div{
    padding: 3px 0;
  }
  .flexbox-content .flexbox-right .flexbox-right-bottom{
    border-top: 1px solid #E0E0E0;
    box-sizing: content-box;
  }
  .flexbox-content .flexbox-right .txt-3{
    font-size:14px;
    text-align: center;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .vux-flexbox-item.active{
    background: #EEEEEE;
  }
</style>
