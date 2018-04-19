<template>
  <div class="login">
    <div class="nav-top">
      <div class="bg-cover">
        <img class="bg-head" src="../assets/bindstudent/banner.png" />
        <div class="bg-title">登录</div>
      </div>
    </div>
    <div class="nav-bottom">
      <flexbox orient="vertical">
        <flexbox-item>
          <div class="flex-div">
            <label class="flex-label">班级代码</label>
            <div class="flex-input"><x-input class="input-color" v-model="classNumber" placeholder="请输入班级代码"></x-input></div>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-div">
            <label class="flex-label">学生姓名</label>
            <div class="flex-input"><x-input class="input-color" v-model="studentName" placeholder="请输入学生姓名"></x-input></div>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-div">
            <label class="flex-label">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</label>
            <div class="flex-input"><x-input class="input-color" v-model="studentNumber" placeholder="请输入学号"></x-input></div>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-div  flex-div-picker">
            <label class="flex-label">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</label>
            <div class="flex-input">
              <popup-picker class="s-pop-pick" value-text-align='center' :data="sexData" v-model="sexVal" @on-show="onShow" @on-hide="onHide" @on-change="onChange" placeholder="请选择">
                <span slot="title" class="icon-down"></span>
              </popup-picker>
            </div>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
    <flexbox style="margin: 50px 0;">
      <flexbox-item class="flex-bottom">
        <div class="flex-div flex-btn" @click="onSumbit">登录</div>
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script>
import { XInput, PopupPicker, Flexbox, FlexboxItem, Cell } from 'vux'
export default {
  components: {
    XInput,
    PopupPicker,
    Flexbox,
    FlexboxItem,
    Cell
  },
  data () {
    return {
      sexData: [['女', '男']],
      sexVal: ['女'],
      classNumber: '',
      studentNumber: '',
      studentName: ''
    }
  },
  methods: {
    onChange (val) {
      console.log('val change', val)
    },
    onShow () {
      console.log('on show')
    },
    onHide (type) {
      console.log('on hide', type)
    },
    async onSumbit () {
      let result = await this.request({
        method: 'post',
        data: {
          request_method: 'student_login',
          class_no: '139247',
          student_name: '王静',
          student_no: '',
          student_gender: ''
        },
        tag: 'login'
      })
      if (result.status === 1) {
        console.log(result)
      }
    }
  }
}
</script>
<style>
  .login .nav-bottom .s-pop-pick .weui-cell{
    position: relative;
    color: #AAAAAA;
    font-size: 16px;
    padding: 10px 0;
  }
  .login .nav-bottom .s-pop-pick .vux-label-desc{
    position: absolute;
    top: 10px;
    right: 0;
    color: #AAAAAA;
    font-size: 16px;
  }
  .login .nav-bottom .s-pop-pick .icon-down{
    position: absolute;
    top: 20px;
    left: 3px;
    color: #AAAAAA;
    font-size: 16px;
  }
  .login .nav-bottom .s-pop-pick .icon-down::before{
    content: '';
    border: 5px solid transparent;
    border-top: 7px solid #AAAAAA;
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: 0px;
  }
  .login .nav-bottom .s-pop-pick .icon-down::after{
    content: '';
    border: 5px solid transparent;
    border-top: 7px solid #fff;
    width: 0;
    height: 0;
    position: absolute;
    top: -2px;
    left: 0px;
  }
  .login .nav-bottom .s-pop-pick .vux-popup-picker-select{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .login .nav-bottom .s-pop-pick .vux-popup-picker-select-box{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 2px;
    width: 100%;
    padding: 0 0 0 14px;
  }
  .login .nav-bottom .s-pop-pick .weui-cell_access .weui-cell__ft:after{
    content: none;
  }
</style>
<style scoped>
  .login{
    height: 100%;
    background-color: #FFFFFF;
  }
  .nav-top{
    position: relative;
    width:100%;
    height:150px;
    background:linear-gradient(top, #C770FF, #9C57FF);  
    background:-moz-linear-gradient(top, #C770FF, #9C57FF);  
  }
  .bg-cover{
    position: absolute;
    width: 100%;
    top: 72px;
    text-align: center;
  }
  .bg-cover .bg-head{
    display: block;
    width: 153px;
    height: 87.5px;
    margin: auto;
  }
  .bg-cover .bg-title{
    color: #AAAAAA;
    font-size: 12px;
  }
  .nav-bottom{
    background: #FFFFFF;
    padding: 70px 30px 0;
  }
  .flex-div{
    position: relative;
  }
  .flex-div .flex-label{
    position: absolute;
    top: 10px;
    left: 0;
  }
  .flex-div .flex-input{
    padding-left: 60px;
    position: relative;
    overflow: hidden;
  }
  .input-color{
    color: #AAAAAA;
  }
  .flex-div.flex-div-picker .flex-input{
    padding-left: 70px;
  }
  .flex-div .flex-input::after{
    content: " ";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid #AAAAAA;
    color: #AAAAAA;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 70px;
  }
  .flex-bottom .flex-btn{
    width: 92%;
    height: 40px;
    background: linear-gradient(top, #C770FF, #9C57FF);
    line-height: 40px;
    color: #FFFFFF;
    text-align: center;
    margin: auto;
    border-radius: 6px;
    letter-spacing: 8px;
  }
</style>
