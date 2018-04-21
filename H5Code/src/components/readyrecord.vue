
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
                  <p style="padding: 10px 0;font-size: 1.3rem;">《巴黎圣母院》</p>
                  <p style="font-size: 12px;">书名:书名书名</p>
                  <p style="font-size: 12px;">出版社:出版社出版社出版社</p>
                  <p style="font-size: 12px;">作者:作者作者</p>
                </div>
              </flexbox-item>
            </flexbox>
            <flexbox class="flex-div">
              <flexbox-item>
                <div>
                  <div class="flex-div-head">
                    <cell is-link :border-intent="false" :arrow-direction="bookMore ? 'up' : 'down'" @click.native="bookMore = !bookMore">
                      <span slot="title" style="font-size: 14px;">
                        <x-input title="必须输入2333" :is-type="be2333" placeholder="I'm placeholder">
                          <img slot="label" style="padding-right:10px;display:block;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000" width="24" height="24">
                        </x-input>
                      </span>
                      <img slot="icon" width="20" style="display:block;margin-right:5px;" :src='iconBook' />
                    </cell>
                  </div>
                  <div class="slide" :class="bookMore?'animate':''">
                    <cell-form-preview :border-intent="false" :list="bookInfo"></cell-form-preview>
                  </div>
                </div>
              </flexbox-item>
            </flexbox>
          </div>
          <div style="border-radius: 6px; width:90%;font-size: 15px;height: 35px;line-height: 35px; margin-top:30px;" class="check-btn">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Cell, CellBox, CellFormPreview } from 'vux'
export default {
  components: {
    Flexbox,
    FlexboxItem,
    CellFormPreview,
    Cell,
    CellBox
  },
  data () {
    return {
      bookMore: false,
      iconBook: require('@/assets/readyrecord/icon_record.png'),
      bookInfo: [{
        label: '开始页码',
        value: '10'
      }, {
        label: '结束页码',
        value: '1111'
      }, {
        label: '时长<span>(分钟)</span>',
        value: '8'
      }, {
        label: '日期<span>(默认当天)</span>',
        value: '8'
      }, {
        label: '家长评分',
        value: '8'
      }]
    }
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
  .readyrecord .flex-div .slide .weui-form-preview__bd,
  .readyrecord .flex-div .slide .weui-form-preview__label{
    color:#000000;
    font-size:.9em;
  }
  .readyrecord .flex-div .slide .weui-form-preview__label>span{
    color:#999999;
    font-size:.5em;
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
  }
  .flex-div .flex-div-head{
    background: #FFFFFF;
  }
  .flex-div .slide{
    padding: 0 35px;
    overflow: hidden;
    max-height: 0;
    transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
  }
  .flex-div .animate {
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
  }
</style>
