<template>
  <div>
    <div class="check-index">
      <div style="position: relative;height: 100%;">
        <div class="check-btn">测试书籍</div>
        <div style="width: 85%;margin: 30px auto 0;">
          <div style="position: relative;">
            <img style="display: block;width: 100%;height: 100%;" :src='topBg' />
            <div class="book-name">
              <div v-show="chooseBook.id === 0" style="padding: 0 15px 0 95px;">未选书籍</div>
              <div v-show="chooseBook.id !== 0" style="padding: 0 15px 0 95px;">《{{ chooseBook.name }}》</div>
            </div>
          </div>
          <div>
            <flexbox class="flex-div">
              <flexbox-item>
                <div class="flex-input">
                  <x-input placeholder="读过的书籍" v-model="searchVal">
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
                          <p v-for="item in searchData" style='padding:5px 0;' @click="onChoose(item)">{{ item.BookTitle }}</p>
                        </template>
                        <p v-else style="text-align: center;">无数据</p>
                      </scroller>
                    </div>
                  </div>
                </div>
              </flexbox-item>
            </flexbox>
            <div v-show="chooseBook.id !== 0">
              <flexbox class="flex-div flex-div-min">
                <flexbox-item>
                  <div class="look-err">试题总数</div>
                </flexbox-item>
                <flexbox-item>
                  <div class="rest-check">{{ chooseBook.queCount }}</div>
                </flexbox-item>
              </flexbox>
              <flexbox class="flex-div flex-div-min">
                <flexbox-item>
                  <div class="look-err">难&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题</div>
                </flexbox-item>
                <flexbox-item>
                  <div class="rest-check">{{ chooseBook.problemCount }}</div>
                </flexbox-item>
              </flexbox>
              <flexbox class="flex-div flex-div-min">
                <flexbox-item>
                  <div class="look-err">一&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;般</div>
                </flexbox-item>
                <flexbox-item>
                  <div class="rest-check">{{ chooseBook.generalCount }}</div>
                </flexbox-item>
              </flexbox>
              <flexbox class="flex-div flex-div-min">
                <flexbox-item>
                  <div class="look-err">容&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;易</div>
                </flexbox-item>
                <flexbox-item>
                  <div class="rest-check">{{ chooseBook.easyCount }}</div>
                </flexbox-item>
              </flexbox>
            </div>
          </div>
        </div>
        <div v-show="chooseBook.id !== 0" style="margin-top:50px;margin-bottom:50px;" @click="goToCheck" class="check-btn">开始测试</div>
      </div>
    </div>
  </div>
</template>
<script>
import { Flexbox, FlexboxItem, XInput, Cell, Scroller } from 'vux'
import { mapGetters } from 'vuex'
export default {
  components: {
    Flexbox,
    FlexboxItem,
    XInput,
    Cell,
    Scroller
  },
  data () {
    return {
      showContent: false,
      iconBook: require('@/assets/readyrecord/icon_record.png'),
      iconBookDown: require('@/assets/readyrecord/cc-down.png'),
      topBg: require('@/assets/checkout/ibanner.png'),
      chooseBook: {
        id: 0,
        name: '',
        queCount: 0,
        problemCount: 0,
        generalCount: 0,
        easyCount: 0
      },
      bookList: [],
      searchVal: ''
    }
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
      if (search) {
        return this.bookList.filter((item) => {
          return String(item.BookTitle).toLowerCase().indexOf(search) > -1
        })
      }
      return this.bookList
    }
  },
  methods: {
    async getBookList () {
      let result = await this.request({
        method: 'post',
        data: {
          request_method: 'get_test_book_list',
          student_id: this.userInfo$$.studentId
        },
        tag: 'get_test_book_list'
      })
      if (result.response_status === 1) {
        this.bookList = result.Book_List
      }
    },
    async getBookInfo (id) {
      let result = await this.request({
        method: 'post',
        data: {
          request_method: 'get_question_count',
          book_id: id
        },
        tag: 'get_question_count'
      })
      if (result.response_status === 1) {
        this.chooseBook.queCount = result.QueCount === null ? 0 : result.QueCount
        this.chooseBook.problemCount = result.ProblemCount === null ? 0 : result.ProblemCount
        this.chooseBook.generalCount = result.GeneralCount === null ? 0 : result.GeneralCount
        this.chooseBook.easyCount = result.EasyCount === null ? 0 : result.EasyCount
      }
    },
    goToCheck () {
      this.$router.push({path: '/browse/checkout/flow/' + this.chooseBook.id})
    },
    onChoose (obj) {
      this.showContent = false
      this.chooseBook.name = obj.BookTitle
      this.chooseBook.id = obj.BookId
      this.getBookInfo(obj.BookId)
    }
  },
  created () {
    this.getBookList()
  }
}
</script>
<style>
  .check-index .flex-input .weui-cell{
    padding: 0;
  }
  .check-index .scroller-div{
    max-height: 200px;
    height: auto !important;
  }
  .check-index .flex-input .vux-x-input-right-full img{
    height: 22px;
    display: block;
    padding: 11px 0;
  }
  .check-index .flex-input .vux-x-input-right-full img.up{
    transform: rotate(180deg);
  }
</style>
<style scoped>
  .check-index{
    height: 100%;
    background:#FFFFFF;
  }
  .check-index .check-btn{
    width: 100%;
    height: 40px;
    background: linear-gradient(top, #ED4AA2, #F63272);
    line-height: 40px;
    color: #FFFFFF;
    text-align: center;
    margin: auto;
    border: 1px solid #C16499;
    letter-spacing: 8px;
    font-size: 20px;    
    box-sizing: border-box;
  }
  .book-name{
    position: absolute;
    width: 100%;
    top: 50%;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 1.2rem;
    line-height: 1;
    margin-top: -10px;
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
  }
  .flex-div.flex-div-min{
    padding: 10px 0;
    width: 80%;
    margin: auto;
    border-bottom: 1px solid #EEEEEE;
  }
</style>
