<template>
  <div class="classfellow">
    <div>
      <masker>
        <div class="m-img" :style="topBg"></div>
        <div slot="content" class="m-title">
          小妹
          <br/>
          八年级四班
        </div>
      </masker>
    </div>
    <div class="pull-scroll">
      <scroller lock-x scrollbar-y use-pullup :pullup-config="pullupConfig2" height="500px" ref="demo2" @on-pullup-loading="load2">
        <div class="box2">
          <flexbox orient="vertical" :gutter="0">
            <flexbox-item>
               <flexbox :gutter="0"   v-for="i in n2">
                 <flexbox-item :span="4">                   
                  <grid>
                    <grid-item :label='i'>
                    </grid-item>
                  </grid>
                 </flexbox-item>
                 <flexbox-item :span="8">
                   <div>                   
                    <grid>
                      <grid-item :label='i'>
                      </grid-item>
                    </grid>
                   </div>
                   <div>                   
                    <grid>
                      <grid-item :label='i'>
                      </grid-item>
                    </grid>
                   </div>
                 </flexbox-item>
               </flexbox>
            </flexbox-item>
          </flexbox>
        </div>
      </scroller>
    </div>
  </div>
</template>
<script>
import { Masker, Grid, GridItem, Flexbox, FlexboxItem, Scroller } from 'vux'
export default {
  components: {
    Masker,
    Grid,
    GridItem,
    Flexbox,
    FlexboxItem,
    Scroller
  },
  data () {
    return {
      topBg: {
        backgroundImage: 'url(' + require('../assets/classfellow/banner.png') + ')'
      },
      isMoreLoading: false,
      pullupConfig2: {
        content: '上拉加载更多',
        downContent: '松开进行加载',
        upContent: '上拉加载更多',
        loadingContent: '加载中...'
      },
      n2: 10
    }
  },
  methods: {
    load2 () {
      setTimeout(() => {
        this.n2 += 10
        setTimeout(() => {
          this.$refs.demo2.donePullup()
        }, 100)
        if (this.n2 === 30) { // unload plugin
          setTimeout(() => {
            this.$refs.demo2.disablePullup()
          }, 100)
        }
      }, 2000)
    }
  }
}
</script>
<style>
  .classfellow .vux-masker{
    background: transparent !important;
  }
</style>
<style scoped>
  .classfellow{
    height: 100%;
    margin: 0;
    padding-top: 47px;
    box-sizing: border-box;
    background-color: #FFFFFF;
    overflow: auto;
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
  }

  .m-title {
    color: #fff;
    text-align: center;
    font-weight: 500;
    font-size: 16px;
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
