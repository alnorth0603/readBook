<template>
  <div>
    <div class="analyse">
      <div>
        <masker>
          <div class="m-img" :style="topBg"></div>
          <div slot="content" class="m-title">
            {{ userInfo$$.studentName }}
            <br/>
            {{ userInfo$$.className }}
          </div>
        </masker>
      </div>
      <div class="t-color">
        <grid>
          <grid-item label="阅读书籍数量">
            <div slot="icon" class="t-color1">{{ readBookCount }}</div>
          </grid-item>
          <grid-item label="阅读总计页数">
            <div slot="icon" class="t-color2">{{ sumPage }}</div>
          </grid-item>
        </grid>
        <grid>
          <grid-item label="阅读时长总计">
            <div slot="icon" class="t-color3">{{ sumTimeCost }}</div>
          </grid-item>
          <grid-item label="阅读总平均分">
            <div slot="icon" class="t-color4">{{ avgScore }}</div>
          </grid-item>
        </grid>
      </div>
      <div>
        <flexbox style="margin: 50px 0;">
          <flexbox-item class="flex-bottom">
            <div class="flex-div flex-btn" @click="goToCheck">我要测试</div>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
  </div>
</template>
<script>
import { Masker, Grid, GridItem, Flexbox, FlexboxItem } from 'vux'
import { mapGetters } from 'vuex'
export default {
  components: {
    Masker,
    Grid,
    GridItem,
    Flexbox,
    FlexboxItem
  },
  data () {
    return {
      topBg: {
        backgroundImage: 'url(' + require('@/assets/analyse/banner.png') + ')'
      },
      readBookCount: 0,
      sumTimeCost: 0,
      avgScore: 0,
      sumPage: 0
    }
  },
  computed: {
    ...mapGetters(['userInfo$$'])
  },
  methods: {
    async getAnalysis () {
      let result = await this.request({
        method: 'post',
        data: {
          request_method: 'reading_analysis',
          student_id: this.userInfo$$.studentId
        },
        tag: 'reading_analysis'
      })
      if (result.response_status === 1) {
        this.readBookCount = result.ReadBookCount === null ? 0 : result.ReadBookCount
        this.sumTimeCost = result.SumTimeCost === null ? 0 : result.SumTimeCost
        this.avgScore = result.AvgScore === null ? 0 : result.AvgScore
        this.sumPage = result.SumPages === null ? 0 : result.SumPages
      }
    },
    goToCheck () {
      this.$router.push({path: '/browse/checkout'})
    }
  },
  created () {
    this.getAnalysis()
  }
}
</script>
<style>
  .analyse .vux-masker{
    background: transparent !important;
  }
  .analyse .t-color .weui-grid__icon{
    width: initial;
    height: inherit;
    text-align: center;
  }
</style>

<style scoped>
  .analyse{
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
  .t-color1{
    display: inline-block;
    color: #FFD120;
    font-size: 38px;
    font-weight: bold;
    background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(254, 209, 32, 1)), to(rgba(254, 175, 32, 1)));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1;
  }
  .t-color2{
    display: inline-block;
    color: #A1D8FF;
    font-size: 38px;
    font-weight: bold;
    background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(161, 216, 255, 1)), to(rgba(80, 183, 254, 1)));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1;
  }
  .t-color3{
    display: inline-block;
    color: #6DC6FF;
    font-size: 38px;
    font-weight: bold;
    background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(199, 111, 255, 1)), to(rgba(158, 58, 254, 1)));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1;
  }
  .t-color4{
    display: inline-block;
    color: #F746A1;
    font-size: 38px;
    font-weight: bold;
    background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(245, 163, 205, 1)), to(rgba(245, 50, 116, 1)));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1;
  }
  .flex-bottom .flex-btn{
    width: 92%;
    height: 40px;
    background: linear-gradient(top, #57f3e6, #39DBCC);
    line-height: 40px;
    color: #FFFFFF;
    text-align: center;
    margin: auto;
    border-radius: 6px;
    letter-spacing: 8px;
  }
</style>
