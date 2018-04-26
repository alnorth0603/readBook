<template>
  <div>
    <div class="readyhistory">
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
      <div>
        <scroller v-show="listDataOpt.data.length" lock-x scrollbar-y use-pullup height="-212" :bounce=false :pullup-config="pullupConfig" ref="pullup_more" @on-pullup-loading="loadMore">
          <div class="box2">
            <flexbox orient="vertical" :gutter="0">
              <template v-for="(item, key, index) in listDataOpt.data">
                <flexbox-item :class="(index + 1) % 2 == 0 ? 'active': ''">
                  <div class="flexbox-content">
                    <div class="flexbox-left">
                      <img style="width:70px;height:103px;margin: 13px auto 0" v-if="item.BookImg === null || item.BookImg === ''" src="../assets/readyrecord/book_bg.png" />
                      <img style="width:70px;height:103px;margin: 13px auto 0;" v-else :src='item.BookImg'>
                    </div>
                    <div class="flexbox-right">
                      <div class="flexbox-right-top">
                        <flexbox :gutter="0">
                          <flexbox-item :span='6'>
                            <div class="txt-1">{{ item.maxEndingPages }}</div>
                            <div class="txt-2">总计页数</div>
                          </flexbox-item>
                          <flexbox-item :span='6'>
                            <div class="txt-1">{{ item.avgScore }}</div>
                            <div class="txt-2">平均阅读得分</div>
                          </flexbox-item>
                        </flexbox>
                      </div>
                      <div class="flexbox-right-bottom">
                        <flexbox :gutter="0">
                          <flexbox-item :span='6'>
                            <div class="txt-1">{{ item.sumTimeCost }}</div>
                            <div class="txt-2">总计时长</div>
                          </flexbox-item>
                          <flexbox-item :span='6'>
                            <div class="txt-1">{{ item.quizScore }}</div>
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
        <div v-show="!listDataOpt.data.length" style="text-align: center;font-size: 1.2rem;background-color: #fbf9fe;padding: 50px 0;">无数据</div>
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
        backgroundImage: 'url(' + require('@/assets/history/rbanner.png') + ')'
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
          request_method: 'get_readbook_list',
          student_id: this.userInfo$$.studentId,
          page_size: this.listDataOpt.size,
          page_index: this.listDataOpt.index
        },
        tag: 'get_readbook_list'
      })
      if (result.response_status === 1) {
        this.listDataOpt.index = result.page_index
        if (this.listDataOpt.index === 1) {
          this.listDataOpt.totalPage = result.pages
        }
        this.listDataOpt.data = result.ReadBook_List
      }
      if (this.listDataOpt.totalPage <= this.listDataOpt.index) {
        this.$refs.pullup_more.disablePullup()
      }
    },
    loadMore () {
      if (this.listDataOpt.totalPage > this.listDataOpt.index) {
        this.listDataOpt.index += 1
        this.$refs.pullup_more.donePullup()
        this.getListData()
      } else {
        this.$refs.pullup_more.disablePullup()
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
    height: 129px;
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
    padding: 10px 0;
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
