<style lang="scss">
  .download-xl-container{
    width: 7.5rem;
  }
  .download-xl{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 7.3rem;
    height: 1.3rem;
    margin: 0 auto;
    background: rgba(0,0,0,0.3);
    border-radius: .1rem;
    padding: 0 .3rem;
    box-sizing: border-box;
    .left{
      display: flex;
      align-items: center;
      .logo{
        width: .9rem;
        height: .9rem;
        margin-right: .22rem;
        background: url(../static/images/logo@2x.png) no-repeat;
        background-size: 100% 100%;
      }
      .desc{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .name{
          color: #fff;
          font-size: .3rem;
        }
        .text{
          margin-top: .16rem;
          color: #bab1c2;
          font-size: .24rem;
        }
      }
    }
    .download-btn{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.9rem;
      height: .7rem;
      color: #fff;
      font-size: .28rem;
      background: #ffa000;
      border-radius: .06rem;
    }
  }
</style>
<template>
  <div class="download-xl-container">
    <div class="download-xl">
      <div class="left">
        <div class="logo"></div>
        <div class="desc">
          <div class="name">小鹿情感</div>
          <div class="text">让爱得偿所愿</div>
        </div>
      </div>
      <div class="download-btn" v-on:click="openApp">立即打开</div>
    </div>
  </div>
</template>

<script>
  import VersionLib from '../../../lib/js/versionCheck'
  import Utils from '../../../lib/js/lib'
  export default{
    methods:{
      openApp(){
        Utils.clickReport('2017双11活动页_下载小鹿按钮点击',true);
        location.href = 'http://m.huainanhai.com/app/sem_click.php?apk=xiaolu_0034';
      }
    }
  }
</script>
