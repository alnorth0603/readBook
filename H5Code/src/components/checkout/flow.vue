<template>
  <div class="check-flow">
    <div style="position: relative;height: 100%;">
      <div class="check-btn-img">
        <img :src='topBg' />
        <div class="m-title">已选书籍</div>
      </div>
      <div style="width: 85%;margin: 30px auto 0;">
        <div style="margin-bottom: 20px;text-indent: 20px;">1.您的成绩为80分，答对题目80个，答错题目20个，成绩优异。希望您继续努力</div>
        <div style="margin-bottom: 20px;">
          <group class="group-radio">
            <radio :selected-label-style="{color: '#09BB07'}" :options="listData" @on-change="change"></radio>
          </group>
        </div>
        <flexbox class="flex-div">
          <flexbox-item>
            <div class="look-err">上一题</div>
          </flexbox-item>
          <flexbox-item>
            <div class="rest-check">下一题</div>
          </flexbox-item>
        </flexbox>
      </div>
      <div style="position: absolute;bottom:10px;" class="check-btn">确认提交</div>
    </div>
  </div>
</template>
<script>
import { Radio, Group, Flexbox, FlexboxItem } from 'vux'
export default {
  components: {
    Radio,
    Group,
    Flexbox,
    FlexboxItem
  },
  data () {
    return {
      topBg: require('@/assets/checkout/flbanner.png'),
      chooseValue: '',
      listData: [{
        key: '001',
        value: 'radio001'
      }, {
        key: '002',
        value: 'radio002'
      }, {
        key: '003',
        value: 'radio002'
      }, {
        key: '004',
        value: 'radio002'
      }]
    }
  },
  methods: {
    change (value, label) {
      console.log('change:', value, label)
    }
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
