<template>
 <div id="app" style="height:100%;">
    <view-box ref="viewBox">
      <x-header slot="header" :left-options="{showBack: false}" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
        <span class="color_1">乐</span><span class="color_2">在</span><span class="color_4">读</span>
        <x-icon slot="right" type="navicon" size="35" style="fill:#F83E91;position:relative;top:-8px;left:-3px;"></x-icon>
      </x-header>
      <transition>
        <router-view class="router-view main"></router-view>
      </transition>
      <tabbar slot="bottom">
        <tabbar-item selected>
          <img slot="icon" src="./assets/tabbar/icon_home.png">
          <img slot="icon-active" src="./assets/tabbar/icon_home_red.png">
          <span slot="label">主页</span>
        </tabbar-item>
        <tabbar-item>
          <img slot="icon" src="./assets/tabbar/icon_books.png">
          <img slot="icon-active" src="./assets/tabbar/icon_books_red.png">
          <span slot="label">阅读记录</span>
        </tabbar-item>
        <tabbar-item link="/setting">
          <img slot="icon" src="./assets/tabbar/icon_setting.png">
          <img slot="icon-active" src="./assets/tabbar/icon_setting_red.png">
          <span slot="label">设置</span>
        </tabbar-item>
      </tabbar>
    </view-box>
 </div>
</template>

<script>
import { XHeader, TransferDom, Tabbar, TabbarItem, ViewBox } from 'vux'
export default {
  directives: {
    TransferDom
  },
  name: 'app',
  components: {
    XHeader,
    Tabbar,
    TabbarItem,
    ViewBox
  }
}
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    background-color: #E8E8E8;
  }
  #app .vux-header,
  #app .weui-tabbar {
    background-color: #FFFFFF;
  }
  .vux-header .vux-header-title > span.color1{}
  #app .vux-header:before{
    content: " ";
    position: absolute;
    left: 0;
    bottom: -1px;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #DDDDDD;
    color: #DDDDDD;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  #app .weui-tabbar:before{
    border-top: 1px solid #DDDDDD;
    color: #DDDDDD;
  }
  #app .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{
    color: #F83E91;
  }
  .vux-header .vux-header-title > span{
    padding: 0 8px;
  }
  .vux-header .vux-header-title > span.color_1{
    color: #FFC320;
  }
  .vux-header .vux-header-title > span.color_2{
    color: #62BFFC;
  }
  .vux-header .vux-header-title > span.color_3{
    color: #9E5AFF;
  }
  .vux-header .vux-header-title > span.color_4{
    color: #F83E91;
  }
  .main{
    margin: 47px 0 10px;
  }
</style>
