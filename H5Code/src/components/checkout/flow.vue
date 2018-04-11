<template>
  <div class="check-flow">
    <div style="position: relative;height: 100%;">
      <div class="check-btn-img">
        <img :src='topBg' />
        <div class="m-title">已选书籍</div>
      </div>
      <div style="width: 85%;margin: 30px auto 0;">
        <div style="margin-bottom: 20px;text-indent: 20px;">1.您的成绩为80分，答对题目80个，答错题目20个，成绩优异。希望您继续努力</div>
        <div>
          <group>
          <radio :selected-label-style="{color: '#FF9900'}" :options="listData" @on-change="change">
            <template slot-scope="props" slot="each-item">
              <p>{{ props.id }}{{ props.value }}{{ props.label }}</p>
            </template>
          </radio>
          </group>
        </div>
      </div>
      <div style="position: absolute;bottom:3px;" class="check-btn">开始测试</div>
    </div>
  </div>
</template>
<script>
import { Radio, Group } from 'vux'
export default {
  components: {
    Radio,
    Group
  },
  data () {
    return {
      topBg: require('@/assets/checkout/flbanner.png'),
      chooseValue: '',
      listData: [{
        id: 'a',
        key: '001',
        value: 'radio001'
      }, {
        id: 'b',
        key: '002',
        value: 'radio002'
      }]
    }
  },
  methods: {
    change (a, value, label) {
      console.log('change:', a, value, label)
    }
  }
}
</script>
<style>
</style>
<style scoped>
  .check-flow{
    height: 100%;
    margin: 0;
    padding-top: 46px;
    box-sizing: border-box;
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
  </style>
