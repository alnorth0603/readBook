<template>
  <div>
    <div class="history">
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
      <div class="pull-scroll">
        <div class="pull-scroll-box">
          <scroller lock-x scrollbar-y use-pullup :pullup-config="pullupConfig" height="100%" ref="demo" @on-pullup-loading="loadMore">
            <div class="box2">
              <flexbox orient="vertical" :gutter="0">
                <template v-for="(item, key, index) in listDataOpt.data">
                  <flexbox-item :class="(index + 1) % 2 == 0 ? 'active': ''">
                    <div class="flexbox-content">
                      <div class="flexbox-left">
                        <img :src='item.BookImg'/>
                      </div>
                      <div class="flexbox-right">
                        <div class="flexbox-right-top">
                          <flexbox :gutter="0">
                            <flexbox-item :span='3'>
                              <div class="txt-1">{{ item.RecordingDate }}</div>
                              <div class="txt-2">阅读日期</div>
                            </flexbox-item>
                            <flexbox-item :span='3'>
                              <div class="txt-1">{{ item.StartPages }}</div>
                              <div class="txt-2">开始页码</div>
                            </flexbox-item>
                            <flexbox-item :span='3'>
                              <div class="txt-1">{{ item.EndingPages }}</div>
                              <div class="txt-2">结束页码</div>
                            </flexbox-item>
                            <flexbox-item :span='3'>
                              <div class="txt-1">{{ item.TimeCost }}</div>
                              <div class="txt-2">时长(分)</div>
                            </flexbox-item>
                          </flexbox>
                        </div>
                        <div class="flexbox-right-bottom">
                          <flexbox :gutter="0">
                            <flexbox-item :span='4'>
                              <div class="txt-1">{{ item.Score }}</div>
                              <div class="txt-2">家长评分</div>
                            </flexbox-item>
                            <flexbox-item :span='8'>
                              <div class="txt-3">{{ item.Appraise }}</div>
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
    </div>
  </div>
</template>
<script>
import { Masker, Grid, GridItem, Flexbox, FlexboxItem, Scroller } from 'vux'
import { mapGetters } from 'vuex'
export default {
  components: {
    Masker,
    Grid,
    GridItem,
    Flexbox,
    FlexboxItem,
    Scroller
  },
  computed: {
    ...mapGetters(['userInfo$$'])
  },
  data () {
    return {
      topBg: {
        backgroundImage: 'url(' + require('@/assets/history/banner.png') + ')'
      },
      isMoreLoading: false,
      pullupConfig: {
        content: '上拉加载更多',
        downContent: '松开进行加载',
        upContent: '上拉加载更多',
        loadingContent: '加载中...'
      },
      listDataOpt: {
        data: [],
        size: 20,
        index: 1,
        totalPage: 0
      }
    }
  },
  methods: {
    async getListData () {
      let result = await this.request({
        method: 'post',
        data: {
          request_method: 'get_recording_list',
          student_id: this.userInfo$$.studentId,
          page_size: this.listDataOpt.size,
          page_index: this.listDataOpt.index
        },
        tag: 'get_recording_list'
      })
      if (result.response_status === 1) {
        this.listDataOpt.index = result.page_index
        if (this.listDataOpt.index === 1) {
          this.listDataOpt.totalPage = result.pages
        }
        this.listDataOpt.data = result.Recording_List
      }
      if (this.listDataOpt.totalPage <= this.listDataOpt.index) {
        this.$refs.demo.disablePullup()
      }
    },
    loadMore () {
      if (this.listDataOpt.totalPage > this.listDataOpt.index) {
        this.listDataOpt.index += 1
        this.$refs.demo.donePullup()
        this.getListData()
      } else {
        this.$refs.demo.disablePullup()
      }
    }
  },
  created () {
    this.listDataOpt.data = []
    this.listDataOpt.totalPage = 0
    this.listDataOpt.index = 1
    this.getListData()
  }
}
</script>
<style>
  .history .vux-masker{
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
  .history{
    height: 100%;
    background-color: #FFFFFF;
  }
  .history .pull-scroll{
    height: 100%;
    position: relative;
  }
  .history .pull-scroll .pull-scroll-box{
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 125px;
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
    height: 117px;
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
    font-size:.5rem;
    text-align: center;
  }
  .flexbox-content .flexbox-right .txt-2{
    font-size:.5rem;
    text-align: center;
  }
  .flexbox-content .flexbox-right>div{
    padding: 10px 0;
  }
  .flexbox-content .flexbox-right .flexbox-right-bottom{
    border-top: 1px solid #E0E0E0;
    box-sizing: content-box;
  }
  .flexbox-content .flexbox-right .txt-3{
    font-size:.5rem;
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
