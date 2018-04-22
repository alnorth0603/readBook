<template>
  <div>
    <div class="check-flow">
      <div style="position: relative;height: 100%;">
        <div class="check-btn-img">
          <img :src='topBg' />
          <div class="m-title">书籍测试</div>
        </div>
        <div style="width: 85%;margin: 30px auto 0;">
          <template>
            <div style="margin-bottom: 20px;text-indent: 20px;">{{ currentData.name }}</div>
            <div style="margin-bottom: 20px;">
              <group class="group-radio">
                <radio v-model="chooseValue" :selected-label-style="{color: '#09BB07'}" :options="currentData.choose" @on-change="change"></radio>
              </group>
            </div>
            <flexbox class="flex-div">
              <flexbox-item>
                <div class="look-err" v-show="!isFrist" @click="onPrevClick">上一题</div>
              </flexbox-item>
              <flexbox-item>
                <div class="rest-check" v-show="!isLast" @click="onNextClick">下一题</div>
              </flexbox-item>
            </flexbox>
          </template>
        </div>
        <div style="position: absolute;bottom:10px;" class="check-btn" @click="calculate" v-show="isLast">确认提交</div>
      </div>
    </div>
  </div>
</template>
<script>
import { Radio, Group, Flexbox, FlexboxItem } from 'vux'
import { mapGetters } from 'vuex'
export default {
  components: {
    Radio,
    Group,
    Flexbox,
    FlexboxItem
  },
  computed: {
    ...mapGetters(['userInfo$$'])
  },
  data () {
    return {
      bookId: this.$route.params.id,
      currIndex: 0,
      topBg: require('@/assets/checkout/flbanner.png'),
      chooseValue: '',
      total: 0,
      listData: [],
      isLast: false,
      isFrist: true,
      currentData: {
        name: '',
        choose: []
      }
    }
  },
  methods: {
    async getQuestionList () {
      let result = await this.request({
        method: 'post',
        data: {
          request_method: 'get_test_question_list',
          book_id: this.bookId
        },
        tag: 'get_test_question_list'
      })
      if (result.response_status === 1) {
        result.Question_List.forEach((element, index) => {
          let temData = {}
          temData.name = (index + 1) + '. ' + element.QuestionTitle
          temData.choose = []
          if (element.QuestionA !== '' && element.QuestionA !== null) {
            temData.choose.push({key: 'A', value: 'A. ' + element.QuestionA})
          }
          if (element.QuestionB !== '' && element.QuestionB !== null) {
            temData.choose.push({key: 'B', value: 'B. ' + element.QuestionB})
          }
          if (element.QuestionC !== '' && element.QuestionC !== null) {
            temData.choose.push({key: 'C', value: 'C. ' + element.QuestionC})
          }
          if (element.QuestionD !== '' && element.QuestionD !== null) {
            temData.choose.push({key: 'D', value: 'D. ' + element.QuestionD})
          }
          temData.answer = element.Answer
          temData.myAnswer = ''
          this.listData.push(temData)
        })
        this.currentData = this.listData[0]
        this.isLast = (this.listData.length === (this.currIndex + 1))
        this.isFrist = ((this.currIndex + 1) === 1)
      }
    },
    change (value, label) {
      this.listData[this.currIndex].myAnswer = value
      this.chooseValue = value
    },
    onPrevClick () {
      if (this.chooseValue === '') {
        this.$vux.toast.text('请选择答案', 'middle')
        return
      }
      this.currIndex = this.currIndex - 1
      this.getQution()
      this.isLast = (this.listData.length === (this.currIndex + 1))
      this.isFrist = ((this.currIndex + 1) === 1)
    },
    onNextClick () {
      if (this.chooseValue === '') {
        this.$vux.toast.text('请选择答案', 'middle')
        return
      }
      this.currIndex = this.currIndex + 1
      this.getQution()
      this.isLast = (this.listData.length === (this.currIndex + 1))
      this.isFrist = ((this.currIndex + 1) === 1)
    },
    getQution () {
      this.chooseValue = ''
      this.currentData = this.listData[this.currIndex]
    },
    calculate () {
      if (this.chooseValue === '') {
        this.$vux.toast.text('请选择答案', 'middle')
        return
      }
      this.listData.forEach(element => {
        if (element.answer === element.myAnswer) {
          this.total = this.total + 1
        }
      })
      let param = {}
      let socre = 100 * this.total / this.listData.length
      param.book_id = this.bookId
      param.Score = socre.toFixed(2)
      param.student_id = this.userInfo$$.studentId
      param.request_method = 'record_score'
      this.recordScore(param)
    },
    async recordScore (param) {
      let result = await this.request({
        method: 'post',
        data: param,
        tag: param.request_method
      })
      if (result.response_status === 1) {
        this.$store.commit('questions$$', this.listData)
        this.$router.push({path: '/browse/checkout/finish'})
      }
    }
  },
  created () {
    this.getQuestionList()
  }
}
</script>
<style>
  .check-flow .group-radio .weui-cells:before{
    border: 0;
    height:0;
  }
  .check-flow .group-radio .weui-cell:before{
    left: 0px;
  }
  .check-flow .group-radio .weui-cell{
    padding-left: 0;
    padding-right: 0;
  }
</style>
<style scoped>
  .check-flow{
    height: 100%;
    background:#FFFFFF;
  }
  .check-flow .check-btn-img{
    position: relative;
    max-width: 100%;
  }
  .check-flow .check-btn-img img{
    display: block;
    height: 100%;
    width: 100%;
    max-width: 100%;
  }
  .check-flow .check-btn-img .m-title {
    color: #fff;
    text-align: center;
    font-weight: 500;
    font-size: 20px;
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
    letter-spacing: 8px;
  }
  .check-flow .check-btn{
    position: absolute;
    bottom: 30px;
    width: 90%;
    left: 0;
    right: 0;
    height: 40px;
    background: linear-gradient(top, #C770FF, #9C57FF);
    line-height: 40px;
    color: #FFFFFF;
    text-align: center;
    margin: auto;
    letter-spacing: 8px;
    font-size: 18px;
    border-radius: 6px;
  }
  .flex-div .look-err{
    width: 100%;
    height: 35px;
    background: linear-gradient(top, #C770FF, #9C57FF);
    line-height: 35px;
    color: #FFFFFF;
    text-align: center;
    margin: auto;
    border-radius: 6px;
    letter-spacing: 8px;
    font-size: 16px;
  }
  .flex-div .rest-check{
    width: 100%;
    height: 35px;
    background: linear-gradient(top, #FFD020, #FFAE1F);
    line-height: 35px;
    color: #FFFFFF;
    text-align: center;
    margin: auto;
    border-radius: 6px;
    letter-spacing: 8px;
    font-size: 16px;
  }
  </style>
