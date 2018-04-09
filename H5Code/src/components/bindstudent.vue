<template>
  <div class="b-student">
    <div class="nav-top">
      <div class="bg-cover">
        <img class="bg-head" src="../assets/bindstudent/banner.png" />
        <div class="bg-title">请填写您的信息</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style scoped>
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
</style>
