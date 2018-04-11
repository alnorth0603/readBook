<template>
  <div class="check-index">
    <div style="position: relative;height: 100%;">
      <div class="check-btn">已选书籍</div>
      <div style="width: 85%;margin: 30px auto 0;">
        <div style="position: relative;">
          <img style="display: block;width: 100%;height: 100%;" :src='topBg' />
          <div class="book-name">《开始测》</div>
        </div>
        <div>
          <flexbox class="flex-div">
            <flexbox-item>
              <div class="look-err">试题总数</div>
            </flexbox-item>
            <flexbox-item>
              <div class="rest-check">5</div>
            </flexbox-item>
          </flexbox>
          <flexbox class="flex-div">
            <flexbox-item>
              <div class="look-err">难&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题</div>
            </flexbox-item>
            <flexbox-item>
              <div class="rest-check">1</div>
            </flexbox-item>
          </flexbox>
          <flexbox class="flex-div">
            <flexbox-item>
              <div class="look-err">一&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;般</div>
            </flexbox-item>
            <flexbox-item>
              <div class="rest-check">1</div>
            </flexbox-item>
          </flexbox>
          <flexbox class="flex-div">
            <flexbox-item>
              <div class="look-err">容&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;易</div>
            </flexbox-item>
            <flexbox-item>
              <div class="rest-check">2</div>
            </flexbox-item>
          </flexbox>
        </div>
      </div>
      <div style="position: absolute;bottom:0;" class="check-btn">开始测试</div>
    </div>
  </div>
</template>
<script>
import { Flexbox, FlexboxItem } from 'vux'
export default {
  components: {
    Flexbox,
    FlexboxItem
  },
  data () {
    return {
      topBg: require('@/assets/checkout/ibanner.png')
    }
  }
}
</script>
<style>
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
  }
  .book-name{
    position: absolute;
    width: 100%;
    top: 50%;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 20px;
    line-height: 1;
    margin-top: -10px;
  }
  .flex-div{
    font-size:14px;
    padding: 5px 0;
    border-bottom: 1px solid #EEEEEE;
  }
</style>
