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
            <div class="flex-input"><x-input class="input-color" v-model="class_no" placeholder="请输入班级代码"></x-input></div>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-div">
            <label class="flex-label">学生姓名</label>
            <div class="flex-input"><x-input class="input-color" v-model="student_name" placeholder="请输入学生姓名"></x-input></div>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-div">
            <label class="flex-label">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</label>
            <div class="flex-input"><x-input class="input-color" v-model="student_no" placeholder="请输入学号"></x-input></div>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-div  flex-div-picker">
            <label class="flex-label">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</label>
            <div class="flex-input">
              <popup-picker class="s-pop-pick" value-text-align='center' :data="sexData"  :columns="1" show-name v-model="gender" @on-change="onChange" placeholder="请选择">
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
      sexData: [{name: '女', value: '1'}, {name: '男', value: '0'}],
      gender: [],
      class_no: '',
      student_name: '',
      student_no: ''
    }
  },
  methods: {
    onChange (val) {
      this.gender = val
    },
    async onSumbit () {
      if (this.class_no === '') {
        this.$vux.toast.text('请输入班级代码', 'middle')
        return
      }
      if (this.student_name === '') {
        this.$vux.toast.text('请输入学生姓名', 'middle')
        return
      }
      // if (this.student_no === '') {
      //   this.$vux.toast.text('请输入学号', 'middle')
      //   return
      // }
      // if (this.gender[0] === '') {
      //   this.$vux.toast.text('请选择性别', 'middle')
      //   return
      // }
      let result = await this.request({
        method: 'post',
        data: {
          request_method: 'student_login',
          class_no: this.class_no, // 139247
          student_name: this.student_name,
          student_no: this.student_no,
          student_gender: this.gender.length === 0 ? '' : this.gender[0]
        },
        tag: 'login'
      })
      if (result.response_status === 1) {
        let userInfo = {}
        userInfo.classNo = this.class_no
        userInfo.className = result.student_class
        userInfo.studentId = result.student_id
        userInfo.studentName = this.student_name
        userInfo.studentNo = this.student_no
        userInfo.gender = this.gender.length === 0 ? '' : this.gender[0]
        this.$store.commit('userInfo$$', userInfo)
        let {redirect = '/'} = this.$route.query
        this.$router.push({path: redirect})
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
  .login .flex-div .weui-input{
    text-align: center; 
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
    font-size: 1.2rem;
    margin-top: -8px;
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
    text-align: center; 
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
