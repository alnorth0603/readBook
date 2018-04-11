<template>
 <div id="app" style="height:100%;">
    <view-box ref="viewBox">
      <x-header slot="header" :left-options="{showBack: false}" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
        <span class="color_1">乐</span><span class="color_2">在</span><span class="color_4">读</span>
        <x-icon slot="right" type="navicon" size="35" style="fill:#F83E91;position:relative;top:-8px;left:-3px;"></x-icon>
      </x-header>
      <transition @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')" :name="viewTransition" :css="!!direction">
        <router-view class="router-view main"></router-view>
      </transition>
      <tabbar slot="bottom">
        <tabbar-item selected :link="{path:'/'}">
          <img slot="icon" src="./assets/tabbar/icon_home.png">
          <img slot="icon-active" src="./assets/tabbar/icon_home_red.png">
          <span slot="label">主页</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/browse/home'}">
          <img slot="icon" src="./assets/tabbar/icon_books.png">
          <img slot="icon-active" src="./assets/tabbar/icon_books_red.png">
          <span slot="label">翻阅记录</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/setting'}">
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
import { mapState, mapActions } from 'vuex'
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
  },
  methods: {
    ...mapActions([
      'updateDemoPosition'
    ])
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      deviceready: state => state.app.deviceready,
      isLoading: state => state.vux.isLoading,
      direction: state => state.vux.direction
    }),
    viewTransition () {
      if (!this.direction) return ''
      console.log('vux-pop-' + (this.direction === 'forward' ? 'in' : 'out'))
      return 'vux-pop-' + (this.direction === 'forward' ? 'in' : 'out')
    }
  }
}
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
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
  .weui-tab__panel{
    background: #F6F6F6;
  }
</style>
