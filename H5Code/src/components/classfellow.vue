<template>
  <div>
    <div class="classfellow">
      <div>
        <masker>
          <div class="m-img" :style="topBg"></div>
          <div slot="content" class="m-title">
            {{ userInfo$$.school }}
            <br/>
            {{ userInfo$$.className }}
          </div>
        </masker>
      </div>
      <div>
        <scroller v-show="listDataOpt.data.length" lock-x scrollbar-y height="-212" :bounce=false>
          <div class="box2">
            <flexbox orient="vertical" :gutter="0">
              <template v-for="(value, key, index) in listDataOpt.data">
                <flexbox-item :class="(index + 1) % 2 == 0 ? 'active': ''">
                  <div class="flexbox-content">
                    <div class="flexbox-left">{{ value.Name }}</div>
                    <div class="flexbox-right">
                      <div class="flexbox-right-top">
                        <div style='font-size:12px;line-height:35px;display:inline-block'>正在阅读书籍</div>
                        <div class="text-overflow txt-right">《{{ value.ReadBookTitle }}》</div>
                      </div>
                      <div class="flexbox-right-bottom">
                        <flexbox :gutter="0">
                          <flexbox-item :span='4' style="height:40px;">
                            <div class="txt-1">{{ value.readBookCount }}</div>
                            <div class="txt-2">总计阅读本数</div>
                          </flexbox-item>
                          <flexbox-item :span='4'>
                            <div class="txt-1">{{ value.sumTimeCost }}</div>
                            <div class="txt-2">总计时长</div>
                          </flexbox-item>
                          <flexbox-item :span='4'>
                            <div class="txt-1">{{ value.sumPages }}</div>
                            <div class="txt-2">总计页数</div>
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
  data () {
    return {
      topBg: {
        backgroundImage: 'url(' + require('@/assets/classfellow/banner.png') + ')'
      },
      listDataOpt: {
        data: []
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo$$'])
  },
  methods: {
    async getClassmate () {
      let result = await this.request({
        method: 'post',
        data: {
          request_method: 'get_classmate_read_list',
          student_id: this.userInfo$$.studentId
        },
        tag: 'get_classmate_read_listlogin'
      })
      if (result.response_status === 1) {
        this.listDataOpt.data = result.ClassMateRead_List
      }
    }
  },
  created () {
    this.getClassmate()
  }
}
</script>
<style>
  .classfellow .vux-masker{
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
  .classfellow{
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
    border-bottom: 1px solid #E0E0E0;
  }
  .flexbox-content .flexbox-left{
    width: 90px;
    height: 90px;
    display: inline-block;
    line-height: 90px;
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
  .flexbox-right .flexbox-right-top{
    position: relative;
    height: 35px;
    width: 100%;
    font-size: 12px;
    border-bottom: 1px solid #E0E0E0;
    padding: 0 0 0 5px;
  }
  .flexbox-right .flexbox-right-bottom{
    position: relative;
    padding: 10px 0 0;
  }
  .flexbox-right .txt-right{
    font-size: 14px;
    line-height: 35px;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    padding-left: 100px;
    box-sizing: border-box;
  }
  .flexbox-right .flexbox-right-bottom .txt-1{
    font-size: 16px;
    line-height: 15px;
    padding-bottom: 7px;
    text-align: center;
  }
  .flexbox-right .flexbox-right-bottom .txt-2{
    line-height: 12px;
    font-size: 12px;
    padding-bottom: 5px;
    text-align: center;
  }
  .vux-flexbox-item.active{
    background: #EEEEEE;
  }
</style>
