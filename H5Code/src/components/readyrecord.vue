
<template>
  <div>
    <div class="readyrecord">
      <div style="position: relative;height: 100%;">
        <div class="check-btn">阅读记录</div>
        <div style="width: 100%;">
          <div>
            <flexbox style="margin: 20px auto;" :gutter="0">
              <flexbox-item style="text-align: center;">
                <div style="width: 80px; height:118px;margin: auto;">
                  <img style="display: block;height: 100%;width: 100%;" src='../assets/readyrecord/book_bg.png' />
                </div>
              </flexbox-item>
              <flexbox-item>
                <div>
                  <p v-show="bookInfo.name !== ''" style="padding: 10px 0;font-size: 1.3rem;">《{{ bookInfo.name}}》</p>
                  <p v-show="bookInfo.publisher !== ''" style="font-size: 12px;">书名:{{ bookInfo.name}}</p>
                  <p v-show="bookInfo.publisher !== ''" style="font-size: 12px;">出版社:{{ bookInfo.publisher}}</p>
                  <p v-show="bookInfo.bookAuthor !== ''" style="font-size: 12px;">作者:{{ bookInfo.bookAuthor}}</p>
                </div>
              </flexbox-item>
            </flexbox>
            <flexbox style="margin-bottom: 20px;" class="flex-div">
              <flexbox-item>
                <div class="flex-input" style="padding: 0 5%;width: 90%;background: #ffffff;">
                  <x-input placeholder="请输入或选择书籍" @on-change="changeSumbit" v-model="searchVal">
                    <img slot="label" width="24" height="24" style="display:block;margin-right:5px;" :src='iconBook' />
                    <div slot="right-full-height" @click="showContent = !showContent">
                      <img :class="showContent?'up':''" width="24" height="24" :src='iconBookDown' />
                    </div>
                  </x-input>
                </div>
                <div class="flex-serch-div">
                  <div class="slide" :class="showContent?'animate':''">
                    <div>
                      <scroller lock-x class="scroller-div">
                        <template v-if="bookList.length" >
                          <p v-for="item in bookList" style='padding:5px 0;' @click="onChoose(item)">{{ item.BookTitle }}</p>
                        </template>
                        <p v-else style="text-align: center;">无数据</p>
                      </scroller>
                    </div>
                  </div>
                </div>
              </flexbox-item>
            </flexbox>
            <div>
              <flexbox class="flex-div flex-div-min">
                <flexbox-item>
                  <div class="look-err">开始页码</div>
                  <div class="rest-check"><x-number :min="1" v-model='bookData.sPage' width='80px' button-style="round" fillable placeholder="开始页码"></x-number></div>
                </flexbox-item>
              </flexbox>
              <flexbox class="flex-div flex-div-min">
                <flexbox-item>
                  <div class="look-err">结束页码</div>
                  <div class="rest-check"><x-number :min="1" v-model='bookData.ePage' width='80px' button-style="round" fillable  placeholder="结束页码"></x-number></div>
                </flexbox-item>
              </flexbox>
              <flexbox class="flex-div flex-div-min">
                <flexbox-item>
                  <div class="look-err">时长<span>(分钟)</span></div>
                  <div class="rest-check"><x-number :min="1" v-model='bookData.tCost' width='80px' button-style="round" fillable  placeholder="时长"></x-number></div>
                </flexbox-item>
              </flexbox>
              <flexbox class="flex-div flex-div-min">
                <flexbox-item>
                  <div class="look-err">家长评分</div>
                  <div class="rest-check"><x-number :min="1" v-model='bookData.score' width='80px' button-style="round" fillable  placeholder="时长"></x-number></div>
                </flexbox-item>
              </flexbox>
              <flexbox class="flex-div flex-div-min">
                <flexbox-item>
                  <div class="look-err">日期<span>(默认当天)</span></div>
                  <div class="rest-check">
                    <calendar class="rest-calendar" v-model='bookData.date' title='' show-popup-header popup-header-title="请选择日期" disable-future></calendar>
                  </div>
                </flexbox-item>
              </flexbox>
              <!-- <flexbox class="flex-div flex-div-min">
                <flexbox-item>
                  <div class="look-err">家长评分</div>
                  <div class="rest-check"><x-input v-model='bookData.score' class="rest-input" placeholder="家长评分"></x-input></div>
                </flexbox-item>
              </flexbox> -->
              <flexbox class="flex-div flex-div-min textarea">
                <flexbox-item>
                  <div class="rest-check-textarea">
                    <x-textarea :max="200" v-model='bookData.appraise' placeholder="阅读心得或家长评语" :show-counter="false" :height="100" :rows="8" :cols="30"></x-textarea>
                  </div>
                  <!-- <div class="look-err">家长评语</div>
                  <div class="rest-check"><x-input v-model='bookData.appraise' class="rest-input" placeholder="家长评语"></x-input></div> -->
                </flexbox-item>
              </flexbox>
            </div>
          </div>
          <div style="border-radius: 6px; width:90%;font-size: 15px;height: 35px;line-height: 35px; margin-top:30px;" class="check-btn" @click="sumbitBook">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, XInput, Cell, Scroller, XNumber, Calendar, dateFormat, XTextarea } from 'vux'
import { mapGetters } from 'vuex'
import { setTimeout } from 'timers'
export default {
  components: {
    Flexbox,
    FlexboxItem,
    Scroller,
    XNumber,
    Cell,
    XInput,
    Calendar,
    XTextarea
  },
  computed: {
    ...mapGetters(['userInfo$$']),
    searchData () {
      let search = this.searchVal
      if (search === '') {
        this.showContent = false
      } else {
        this.showContent = true
      }
      this.bookInfo.name = search
      this.bookInfo.publisher = ''
      this.bookInfo.bookImg = ''
      this.bookInfo.bookAuthor = ''
      if (search) {
        return this.bookList.filter((item) => {
          return String(item.BookTitle).toLowerCase().indexOf(search) > -1
        })
      }
      return this.bookList
    }
  },
  data () {
    return {
      bookList: [],
      searchVal: '',
      showContent: false,
      iconBook: require('@/assets/readyrecord/icon_record.png'),
      iconBookDown: require('@/assets/readyrecord/cc-down.png'),
      bookInfo: {
        name: '',
        publisher: '',
        bookImg: '',
        bookAuthor: ''
      },
      bookData: {
        sPage: 1,
        ePage: 1,
        tCost: 30,
        date: 'TODAY',
        score: 60,
        appraise: ''
      }
    }
  },
  methods: {
    changeSumbit () {
      this.bookInfo.name = this.searchVal
      this.bookInfo.publisher = ''
      this.bookInfo.bookImg = ''
      this.bookInfo.bookAuthor = ''
    },
    onChoose (obj) {
      this.bookInfo.name = obj.BookTitle
      this.bookInfo.publisher = obj.Publisher === null ? '' : obj.Publisher
      this.bookInfo.bookImg = obj.BookImg === null ? '' : obj.BookImg
      this.bookInfo.bookAuthor = obj.BookAuthor === null ? '' : obj.BookAuthor
      this.searchVal = obj.BookTitle
      this.showContent = false
    },
    sumbitBook () {
      if (!/^\d+(\.\d+)?$/.test(this.bookData.score)) {
        this.$vux.toast.text('家长评分不合法', 'middle')
        return
      }
      if (this.bookData.appraise === '') {
        this.$vux.toast.text('家长评语不能为空', 'middle')
        return
      }
      let param = {}
      param.request_method = 'student_recording'
      param.student_id = this.userInfo$$.studentId
      param.start_page = this.bookData.sPage
      param.end_page = this.bookData.ePage
      param.time_cost = this.bookData.tCost
      param.recording_date = this.bookData.date
      param.score = this.bookData.score
      param.appraise = this.bookData.appraise
      param.book_name = this.bookInfo.name
      this.postData(param)
    },
    async postData (param) {
      let result = await this.request({
        method: 'post',
        data: param,
        tag: param.request_method
      })
      if (result.response_status === 1) {
        this.$vux.toast.text('提交成功', 'middle')
        this.clearData()
        setTimeout(() => {
          this.$router.push({path: '/browse/home'})
        }, 1000)
      }
    },
    async getBookList () {
      let result = await this.request({
        method: 'post',
        data: {
          request_method: 'get_book_list',
          student_id: this.userInfo$$.studentId
        },
        tag: 'get_book_list'
      })
      if (result.response_status === 1) {
        this.bookList = result.Book_List
      }
    },
    async setBookInfo () {
      let result = await this.request({
        method: 'post',
        data: {
          request_method: 'student_recording',
          student_id: this.userInfo$$.studentId,
          start_page: this.bookData.sPage,
          end_page: this.bookData.ePage,
          time_cost: this.bookData.tCost,
          recording_date: this.bookData.date,
          score: this.bookData.score,
          appraise: this.bookData.appraise
        },
        tag: 'student_recording'
      })
      if (result.response_status === 1) {
        this.bookList = result.Book_List
      }
    },
    clearData () {
      this.searchVal = ''
      this.bookInfo = {
        name: '',
        publisher: '',
        bookImg: '',
        bookAuthor: ''
      }
      this.bookData = {
        sPage: 0,
        ePage: 0,
        tCost: 0,
        date: dateFormat(new Date(), 'YYYY-MM-DD'),
        score: 0,
        appraise: ''
      }
      this.getBookList()
    }
  },
  created () {
    this.getBookList()
  }
}
</script>

<style>
  .readyrecord .flex-div-head .weui-cell_access .weui-cell__ft {
    padding-right: 13px;
    position: relative;
  }
  .readyrecord .flex-div-head .vux-cell-arrow-transition:after {
    transition: transform .3s;
  }
  .readyrecord .flex-div-head .weui-cell_access .weui-cell__ft:after {
    content: " ";
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #c8c8cd;
    border-style: solid;
    transform: matrix(.71,.71,-.71,.71,0,0);
    position: relative;
    top: -2px;
    position: absolute;
    top: 50%;
    margin-top: -4px;
    right: 2px;
  }
  .readyrecord .flex-div-head .weui-cell_access .weui-cell__ft.vux-cell-arrow-down:after{
    transform: matrix(.71,.71,-.71,.71,0,0) rotate(90deg);
  }
  .readyrecord .flex-div-head .weui-cell_access .weui-cell__ft.vux-cell-arrow-up::after {
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(-90deg);
  }

  .readyrecord .flex-input .weui-cell{
    padding: 0;
  }
  .readyrecord .scroller-div{
    max-height: 200px;
    height: auto !important;
  }
  .readyrecord .flex-input .vux-x-input-right-full img{
    height: 22px;
    display: block;
    padding: 11px 0;
  }
  .readyrecord .flex-input .vux-x-input-right-full img.up{
    transform: rotate(180deg);
  }
  .readyrecord .flex-div-min .vux-number-round .vux-number-input {
    background: #fbf9fe;
    font-size: 18px;
  }
  .readyrecord .flex-div-min .rest-calendar .weui-cell__ft .vux-cell-value{
    height: 20px;
    font-size: 18px;
  }
  .readyrecord .flex-div-min .rest-input .weui-input{
    height: 20px;
    font-size: 18px;
  }
  .readyrecord .vux-calendar:before{
     border-top: 0
  }
  .readyrecord .weui-textarea{
    background: #fbf9fe;
    font-size: 18px;
  }
</style>
<style scoped>
  .readyrecord{
    height: 100%;
  }
  .readyrecord .check-btn{
    width: 100%;
    height: 40px;
    background: linear-gradient(top, #80E99B, #4DCC54);
    line-height: 40px;
    color: #FFFFFF;
    text-align: center;
    margin: auto;
    border: 1px solid #B3E5B6;
    letter-spacing: 8px;
    font-size: 18px;
    box-sizing: border-box;
  }
  .flex-div{
    font-size:14px;
    border-bottom: 1px solid #EEEEEE;
  }
  .slide {
    position: absolute;
    background: #ffffff;
    width: 100%;
    overflow: hidden;
    max-height: 0;
    transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
    left: 0;
    right: 0;
  }
  .slide>div{
    padding: 0 20px;
    box-sizing: border-box;
    border: 1px solid #C0BFC4;
  }
  .animate {
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
  }
  .flex-serch-div{
    position: relative;
    z-index: 5;
  }
  .flex-div.flex-div-min{
    width: 80%;
    margin:auto;
    border-bottom: 1px solid #EEEEEE;
    position: relative;
    height: 48px;
  }
  .flex-div.flex-div-min.textarea{
    height: auto;
  }
  .flex-div.flex-div-min .rest-check{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    padding-left: 100px;
  }
  .flex-div.flex-div-min .look-err{
    font-size:1.2rem;
    width: 100px;
    display: inline-block;
  }
  .flex-div.flex-div-min .look-err>span{
    font-size:.7rem;
    color: #888;
  }
  .flex-div.flex-div-min .rest-check-textarea .vux-x-textarea{
    padding: 0;
  }
  .flex-div.flex-div-min .rest-check-textarea .weui-textarea{
     padding: 10px 0;
  }
</style>
