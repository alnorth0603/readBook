<template>
  <div style="height:100%;">
    <div v-transfer-dom>
      <loading v-model="isLoading"></loading>
    </div>

    <drawer
    width="200px;"
    :show.sync="drawerVisibility"
    :show-mode="showModeValue"
    :placement="showPlacementValue"
    :drawer-style="{'background-color':'#35495e', width: '200px'}">

      <div slot="drawer">菜单</div>

      <view-box ref="viewBox" body-padding-top="46px" :body-padding-bottom="route.path === '/login' ? '0' : '55px'">

        <x-header  class="lynn-header" slot="header"
        style="width:100%;position:absolute;left:0;top:0;z-index:100;"
        :left-options="leftOptions"
        :title="title"
        :transition="headerTransition"
        @on-click-more="onClickMore">
          <span class="color_1">乐</span><span class="color_2">在</span><span class="color_4">读</span>
          <x-icon slot="right" type="navicon" size="35" style="fill:#F83E91;position:relative;top:-8px;left:-3px;" @click="drawerVisibility = !drawerVisibility"></x-icon>
        </x-header>

        <transition
        @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
        :name="viewTransition" :css="!!direction">
          <router-view class="router-view"></router-view>
        </transition>

        <tabbar slot="bottom" class="vux-demo-tabbar" v-show="route.path !== '/login'">
          <tabbar-item :selected="route.path === '/'" :link="{path:'/'}">
            <img slot="icon" src="./assets/tabbar/icon_home.png">
            <img slot="icon-active" src="./assets/tabbar/icon_home_red.png">
            <span slot="label">主页</span>
          </tabbar-item>
          <tabbar-item :selected="route.path.indexOf('/browse') === 0" :link="{path:'/browse/home'}">
            <img slot="icon" src="./assets/tabbar/icon_books.png">
            <img slot="icon-active" src="./assets/tabbar/icon_books_red.png">
            <span slot="label">翻阅记录</span>
          </tabbar-item>
          <tabbar-item :selected="route.path.indexOf('/setting') === 0" :link="{path:'/setting'}">
            <img slot="icon" src="./assets/tabbar/icon_setting.png">
            <img slot="icon-active" src="./assets/tabbar/icon_setting_red.png">
            <span slot="label">设置</span>
          </tabbar-item>
        </tabbar>
      </view-box>
    </drawer>
  </div>
</template>

<script>
import { Drawer, ViewBox, XHeader, Tabbar, TabbarItem, Loading, TransferDom } from 'vux'
import { mapState } from 'vuex'
export default {
  directives: {
    TransferDom
  },
  components: {
    Drawer,
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem,
    Loading
  },
  methods: {
    onClickMore () {
      this.showMenu = true
    }
  },
  mounted () {
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      deviceready: state => state.app.deviceready,
      isLoading: state => state.isLoading,
      direction: state => state.direction
    }),
    leftOptions () {
      return {
        showBack: this.route.path !== '/'
      }
    },
    headerTransition () {
      if (!this.direction) return ''
      return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
    },
    componentName () {
      if (this.route.path) {
        const parts = this.route.path.split('/')
        if (/component/.test(this.route.path) && parts[2]) return parts[2]
      }
    },
    title () {
      return this.componentName ? '' : ''
    },
    viewTransition () {
      if (!this.direction) return ''
      return 'vux-pop-' + (this.direction === 'forward' ? 'in' : 'out')
    }
  },
  data () {
    return {
      showMenu: false,
      drawerVisibility: false,
      showMode: 'push',
      showModeValue: 'push',
      showPlacement: 'left',
      showPlacementValue: 'left'
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';
body {
  background-color:#E8E8E8;
}
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
.demo-icon-22 {
  font-family: 'vux-demo';
  font-size: 22px;
  color: #888;
}
.vux-demo-tabbar .weui-bar__item_on .demo-icon-22 {
  color: #F70968;
}
.vux-demo-tabbar .weui-tabbar_item.weui-bar__item_on .vux-demo-tabbar-icon-home {
  color: rgb(53, 73, 94);
}
.demo-icon-22:before {
  content: attr(icon);
}
.vux-demo-tabbar-component {
  background-color: #F70968;
  color: #fff;
  border-radius: 7px;
  padding: 0 4px;
  line-height: 14px;
}
.weui-tabbar__icon + .weui-tabbar__label {
  margin-top: 0!important;
}
.vux-demo-header-box {
  z-index: 100;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}
@font-face {
  font-family: 'lynn-font';
  src: url('./assets/fonts/font.eot');
  src: url('./assets/fonts/font.eot?#iefix') format('embedded-opentype'),
  url('./assets/fonts/font.woff') format('woff'),
  url('./assets/fonts/font.ttf') format('truetype'),
  url('./assets/fonts/font.svg#iconfont') format('svg');
}
.demo-icon {
  font-family: 'vux-demo';
  font-size: 20px;
  color: #04BE02;
}
.demo-icon-big {
  font-size: 28px;
}
.demo-icon:before {
  content: attr(icon);
}
.router-view {
  width: 100%;
  height: 100%;
  top: 46px;
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  top: 46px;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.menu-title {
  color: #888;
}
.lynn-header.vux-header{
  background-color: #FFFFFF;
}
.lynn-header.vux-header .vux-header-left .vux-header-back{
  color: #888;
}
.lynn-header.vux-header .vux-header-left .left-arrow:before{
  border-color: #888;
}
.lynn-header .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{
  color: #F83E91;
}
.lynn-header .vux-header-title > span{
  padding: 0 8px;
}
.lynn-header span.color_1{
  color: #FFC320;
}
.lynn-header span.color_2{
  color: #62BFFC;
}
.lynn-header span.color_3{
  color: #9E5AFF;
}
.lynn-header span.color_4{
  color: #F83E91;
}
</style>