<template>
  <div class="setting">
    <div class="nav-top">
      <div class="head-src">
        <img src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff" />
      </div>
      <div class="grid no-border">
        <grid :show-lr-borders="false" :show-vertical-dividers="false">
          <grid-item>
            <span class="whiter" slot="label">开始记录</span>
          </grid-item>
          <grid-item>
            <span class="whiter" slot="label">开始记录</span>
          </grid-item>
        </grid>
      </div>
    </div>
  </div>
</template>

<script>
import { Grid, GridItem } from 'vux'
export default {
  components: {
    Grid,
    GridItem
  }
}
</script>
<style>
  .nav-top{    
    background: url(/static/img/top_bg.a11b29d.png) center center no-repeat;
    width: 100%;
    height: 150px;
    background-size: cover;
  }
  .head-src{
    width: 70px;
    height: 70px;
    margin: auto;
    padding-top: 20px;
  }
  .head-src>img{
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .grid.no-border .weui-grids::before,
  .grid.no-border .weui-grid::after{
    border: 0;
    height: 0;
  }
  .whiter{
    color: #FFFFFF;
  }
</style>

