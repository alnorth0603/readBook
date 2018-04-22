<template>
  <div>
    <div class="setting">
      <div class="nav-top">
        <img class="bg" src="../assets/setting/top_bg.png" />
        <div class="bg-cover">
          <div class="head-src">
            <img src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff" />
          </div>
          <div class="grid no-border">
            <grid :show-lr-borders="false" :show-vertical-dividers="false">
              <grid-item>
                <span class="whiter" slot="label">微信昵称</span>
              </grid-item>
              <grid-item>
                <span class="whiter" slot="label">当前学生 {{userInfo$$.studentName}}</span>
              </grid-item>
            </grid>
          </div>
        </div>
      </div>
      <div class="nav-bottom">
        <group>
          <cell is-link @click.native='cellClick(1)'>
            <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/setting/icon_location.png">
            <span slot="title">所在区域</span>
          </cell>
          <cell is-link @click.native='cellClick(2)'>
            <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/setting/icon_people.png">
            <span slot="title">绑定学生</span>
          </cell>
          <cell is-link @click.native='cellClick(3)'>
            <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/setting/icon_edit.png">
            <span slot="title">关于</span>
          </cell>
          <cell is-link @click.native='cellClick(4)'>
            <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/setting/icon_exit.png">
            <span slot="title">退出</span>
          </cell>
        </group>
      </div>
    </div>
  </div>
</template>

<script>
import { Grid, GridItem, Group, Cell } from 'vux'
import { mapGetters } from 'vuex'
export default {
  components: {
    Grid,
    GridItem,
    Group,
    Cell
  },
  computed: {
    ...mapGetters(['userInfo$$'])
  },
  methods: {
    cellClick (id) {
      switch (id) {
        case 2:
          this.$router.push({path: '/login', query: {redirect: '/setting'}})
          break
        case 4:
          this.$store.commit('userInfo$$', null)
          this.$router.push({path: '/'})
          break
        default:
          this.$vux.toast.text('暂未开放', 'middle')
          break
      }
    }
  }
}
</script>
<style scoped>
  .nav-top{    
    position: relative;
  }
  .nav-top .bg{    
    width: 100%;
    height: 150px;
    display: block;
  }
  .bg-cover{
    position: absolute;
    top: 0;
    width: 100%;
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
  .grid.no-border{
    background:transparent;
  }
  .whiter{
    color: #FFFFFF;
  } 
</style>

