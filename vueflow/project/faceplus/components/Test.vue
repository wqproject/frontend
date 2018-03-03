<style lang="scss">
  @import "../../../lib/scss/lib";
  .clip-wrap{
    overflow: hidden;
    img{
      width: 100%;
      height: 3rem;
    }
  }
  .share-img{
    width: 100%;
  }
</style>

<template>
  <div id="test">
    <div id="clip-wrap" class="clip-wrap" v-on:click="shareImage">
      <img src="static/images/bg-result.jpg" alt="">
      <img src="https://morgoth-aman.huainanhai.com/user/upload/59f936559cd00" alt="">
    </div>
    <img class="share-img" :src="shareUrl">
  </div>
</template>

<script>
  import {upload} from '../api/upload'
  export default {
    data() {
      return {
        shareUrl:''
      }
    },
    methods:{
      shareImage() {
        let _this = this;
        let clipDom = document.getElementById('clip-wrap');
        let scale = 3;//图片放大倍数（清晰度）
        let canvas = scaleCanvas(clipDom,scale);//自定义canvas
        html2canvas(clipDom,{
          canvas:canvas,
          scale:scale,
          useCORS:true,
          logging: true,
          width:clipDom.clientWidth, //dom 原始宽度
          height:clipDom.clientHeight, //dom 原始高度
          onrendered : function(canvas) {
            try{
              canvas.toBlob(function (file) {
                upload(file)
                  .then(function (imageUrl) {
                    _this.shareUrl = imageUrl;
                    console.log(imageUrl);
                  });
              },'image/png',1);
            }catch (e){
              console.log(e);
              alert('分享截图失败');
            }
          }
        });
      }
    }
  }

  function scaleCanvas(clipDom,scale) {
    let w = clipDom.clientWidth;
    let h = clipDom.clientHeight;
    let canvas = document.createElement('canvas');
    canvas.width = w*scale;
    canvas.height = h*scale;
    canvas.style.width = w + 'px';
    canvas.style.height = w + 'px';
    let context = canvas.getContext('2d');
    context.scale(scale,scale);
    return canvas;
  }
</script>


