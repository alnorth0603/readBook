<template>
  <div>
    <div class="check-finish">
      <div>
        <masker>
          <div class="m-img" :style="topBg"></div>
          <div slot="content" class="m-content">
            <div class="m-title">测试完成</div>
            <div class="m-ring">
              <div class="ring-content">
                <div class="txt-1">{{ socre }}</div>
                <div class="txt-2">PERFORMANCE</div>
              </div>
            </div>
          </div>
        </masker>
      </div>
      <div style="margin-top:50px">
        <div style="font-size: 18px;padding: 0px 10%;">您的成绩为{{ socre }}分，答对题目{{ total }}个，答错题目{{ questions$$.length - total }}个，成绩优异。希望您继续努力!</div>
        <div style="padding: 30px 5%;margin-top:50px;margin-bottom:50px;">
          <flexbox class="flex-div">
            <flexbox-item>
              <div class="look-err" @click="restCheckOther">测试其他</div>
            </flexbox-item>
            <flexbox-item>
              <div class="rest-check" @click="restCheck">再测一次</div>
            </flexbox-item>
          </flexbox>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Flexbox, FlexboxItem, Masker } from 'vux'
import { mapGetters } from 'vuex'
export default {
  components: {
    Masker,
    Flexbox,
    FlexboxItem
  },
  computed: {
    ...mapGetters(['questions$$'])
  },
  data () {
    return {
      bookId: this.$route.params.id,
      topBg: {
        backgroundImage: 'url(' + require('@/assets/checkout/fbanner.png') + ')'
      },
      socre: 0,
      total: 0
    }
  },
  methods: {
    initData () {
      this.questions$$.forEach(element => {
        if (element.answer === element.myAnswer) {
          this.total = this.total + 1
        }
      })
      this.socre = (100 * this.total / this.questions$$.length).toFixed(2)
    },
    restCheckOther () {
      this.$router.push({path: '/browse/checkout'})
    },
    restCheck () {
      this.$router.push({path: '/browse/checkout/flow/' + this.bookId})
    }
  },
  created () {
    this.initData()
  }
}
</script>
<style>
  .check-finish .vux-masker{
    background: transparent !important;
  }
</style>
<style scoped>
  .check-finish{
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
    height: 100px;
  }
  .m-content{
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
  }
  .m-title {
    color: #fff;
    text-align: center;
    font-weight: 500;
    font-size: 16px;
    padding: 0 0 15px 0;
  }
  .m-ring {
    position: relative;
    width: 120px;
    height: 120px;
    border: 2px solid #FFD220;
    border-radius: 50%;
    display: inline-block;
  }
  .ring-content{
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
  }
  .ring-content .txt-1{
    font-size: 2rem;
    font-weight: bold;
    line-height: 1;
    padding-bottom: 5px;
    color: #FFD220;
  }
  .ring-content .txt-2{
    font-size: 12px;
    color: #FFD220;
  }
  .flex-div .look-err{
    width: 100%;
    height: 40px;
    background: linear-gradient(top, #C770FF, #9C57FF);
    line-height: 40px;
    color: #FFFFFF;
    text-align: center;
    margin: auto;
    border-radius: 6px;
    letter-spacing: 4px;
    font-size: 1.1rem;
  }
  .flex-div .rest-check{
    width: 100%;
    height: 40px;
    background: linear-gradient(top, #FFD020, #FFAE1F);
    line-height: 40px;
    color: #FFFFFF;
    text-align: center;
    margin: auto;
    border-radius: 6px;
    letter-spacing: 4px;
    font-size: 1.1rem;
  }
</style>
