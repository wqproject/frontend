<style lang="scss">
  @import "../../../lib/scss/reset";
  @import "../../../lib/scss/lib";
  .app-container{
    @include page();
    font-size: .24rem;
  }
  .xl-bg-warp{
    position: relative;
    width: 3.93rem;
    height: 4.91rem;
    overflow: hidden;
    .xl-bg{
      margin: .19rem;
      width: 3.56rem;
      height: 4.54rem;
      background: rgba(255,255,255,.3);
      border-radius: .4rem;
    }
    .xl-img{
      position: absolute;
      top: .35rem;
      left: .39rem;
      z-index: 1;
      width: 3.16rem;
      height: 4.2rem;
      border-radius: .4rem;
      background: #fff;
      .img{
        width: 100%;
        height: 100%;
        background: url(../static/images/XIAOLU.png) no-repeat;
        background-size: 100% 100%;
        img{
          @include auto-size-img;
        }
      }
      .img-error{
        margin: .32rem auto;
        width: 2.33rem;
        height: 3.58rem;
        background: url(../static/images/retest-img.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    .xl-border{
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      height: 100%;
      background: url(../static/images/xiaolu-img-bg.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .index {
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(../static/images/bg-index.jpg) no-repeat;
    background-size: 100% 100%;
    z-index: 1;
    overflow: scroll;
    .xl-bg-warp{
      margin: 3.5rem auto 0;
    }

    .btn-test {
      width: 3.06rem;
      height: 1.25rem;
      margin: 0.5rem auto 0;
      background: url(../static/images/btn-test.png) no-repeat;
      background-size: 100% 100%;
      input {
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
    .uploading{
      width: 3.06rem;
      height: 1.25rem;
      margin: 0.5rem auto 0;
      background: url(../static/images/bg-uploading.png) no-repeat;
      background-size: 100% 100%;
    }
    @media screen and (max-height: 500px) and (min-width: 320px) {
      .xl-bg-warp{
        margin: 3rem auto 0;
      }
      .btn-test,.uploading{
        margin-top: .3rem;
      }
    }
    @media screen and (max-height: 667px) and (min-width: 375px){
      .xl-bg-warp{
        margin: 4.3rem auto 0;
      }
    }
    @media screen and (max-height: 610px) and (min-width: 375px){
      .xl-bg-warp{
        margin: 3.5rem auto 0;
      }
    }
    @media screen and (max-height: 555px) and (min-width: 375px){
      .xl-bg-warp{
        margin: 3rem auto 0;
      }
      .btn-test,.uploading{
        margin-top: .3rem;
      }
    }

    .download-banner{
      position: absolute;
      bottom: .1rem;
      left: 0;
    }
  }
  .error{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(../static/images/bg-index.jpg) no-repeat;
    background-size: 100%;
    overflow: scroll;
    z-index: 2;
    .xl-bg-warp{
      margin: 3.5rem auto 0;
    }
    .btn-retest {
      width: 3.06rem;
      height: 1.25rem;
      margin: 0.5rem auto 0;
      background: url(../static/images/btn-retest.png) no-repeat;
      background-size: 100% 100%;
    }
    .download-banner{
      position: absolute;
      bottom: .1rem;
      left: 0;
    }
  }
  .result{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(../static/images/bg-result.jpg) no-repeat;
    background-size: 100%;
    overflow: scroll;
    z-index: 2;
    .content-wrap{
      display: flex;
      align-items: center;
      justify-content: center;
      margin: .5rem auto;
      width: 6.54rem;
      padding: .3rem;
      box-sizing: border-box;
      background: rgba(255,255,255,.3);
      border-radius: .3rem;
      .inner-wrap{
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 6.06rem;
        background: #fff;
        border-radius: .4rem;
        padding: .3rem;
        box-sizing: border-box;
        overflow: hidden;
      }
      .icon-sale{
        position: absolute;
        top: .1rem;
        right: .1rem;
        width: 1.52rem;
        height: 1.58rem;
        background: url(../static/images/icon-sale.png) no-repeat;
        background-size: 100% 100%;
        z-index: 2;
      }
      .photo-wrap{
        position: relative;
        width: 5.46rem;
        height: 3.86rem;
        border: .04rem #9f3552 solid;
        border-radius: .2rem;
        img{
          margin: 0 auto;
          height: 100%;
          width: 2.88rem;
        }
      }
      .result-text{
        margin-top: .25rem;
        font-size: .32rem;
        color: #552144;
        line-height: 1.4;
        text-align: left;
      }
      .price-wrap{
        display: flex;
        align-items: center;
        width: 100%;
        margin-top: .25rem;
        .price{
          font-size: .38rem;
          color: #fd726b;
          margin-right: .24rem;
        }
        .tips{
          padding: 0 .2rem;
          border-radius: .34rem;
          line-height: .34rem;
          background: #cecece;
          color: #7c5d71;
          font-size: .2rem;
        }
      }
      .info-wrap{
        width: 100%;
        margin-top: .2rem;
        display: flex;
        justify-content: space-between;
        color: #7c5d71;
        font-size: .28rem;
      }
      .qr-code{
        margin-top: .3rem;
        width: 1.34rem;
        height: 1.34rem;
        img{
          @include auto-size-img;
        }
      }
      .text{
        display: flex;
        justify-content: space-between;
        margin-top: .06rem;
        width: 1.34rem;
        text-align: justify;
        color: #999;
      }
      .clip-img{
        position: absolute;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        img{
          @include auto-size-img;
        }
      }
    }
    .save-tips{
      font-size: .24rem;
      color: #fff;
      margin-top: -.15rem;
      margin-bottom: .23rem;
    }
    .btn-wrap{
      margin: 0 .3rem;
      display: flex;
      justify-content: center;
      &.is-app{
        justify-content: space-between;
      }
      .btn-retest{
        width: 3.06rem;
        height: 1.25rem;
        background: url(../static/images/btn-retest.png) no-repeat;
        background-size: 100% 100%;
      }
      .btn-share{
        width: 3.06rem;
        height: 1.24rem;
        background: url(../static/images/btn-share.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .loading{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    z-index: 999;
    background: rgba(0,0,0,.1);
    .center{
      @include position-center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: rgba(255,255,255,.9);
      width: 5rem;
      padding: .5rem .3rem;
      border-radius: .3rem;
    }
    .gif{
      width: .6rem;
      height: .6rem;
      img{
        @include auto-size-img;
      }
    }
    .tips{
      padding: .15rem .3rem;
      color: #666;
      line-height: 1.4;
      font-size: .32rem;
      border-radius: .1rem;
    }
  }
</style>
<template>
  <div class="app-container" id="face">
    <div class="index">
      <div class="xl-bg-warp">
        <div class="xl-bg"></div>
        <div class="xl-border"></div>
        <div class="xl-img">
          <div class="img">
            <img :src='localImageUrl' alt="">
          </div>
        </div>
      </div>
      <div class="btn-test" v-on:click='uploadHandle' v-show="!isUploading">
        <input type="file" accept="image/*" multiple='multiple' v-on:change='imgChange'>
      </div>
      <div class="uploading" v-show="isUploading"></div>
      <download-banner class="download-banner" v-if="isShowDownloadBanner"></download-banner>
    </div>
    <div class="error" v-show="isUploadError">
      <div class="xl-bg-warp">
        <div class="xl-bg"></div>
        <div class="xl-border"></div>
        <div class="xl-img">
          <div class="img-error"></div>
        </div>
      </div>
      <div class="btn-retest" v-on:click="reTest"></div>
      <download-banner class="download-banner" v-if="isShowDownloadBanner"></download-banner>
    </div>
    <div class="result" v-show="isShowResult">
      <div class="content-wrap">
        <div  class="inner-wrap" id="clip-container">
          <div class="icon-sale" v-if="!isIos"></div>
          <div class="photo-wrap">
            <img :src="imageUrl" alt="">
          </div>
          <div class="result-text" v-text="text">能文能武，能说会唱，上的厅堂下的厨房，那是相当的枪手啊！哈哈哈</div>
          <div class="price-wrap">
            <div class="price">￥<span v-text="price" >128</span></div>
            <div class="tips">一经售出概不退货</div>
          </div>
          <div class="info-wrap">
            <div class="express">快递：免运费</div>
            <div class="repertory">库存1笔</div>
            <div class="seller">小鹿情感</div>
          </div>
          <div class="qr-code">
            <img src="static/images/qr-code.png" alt="">
          </div>
          <div class="text"><span>颜</span><span>值</span><span>测</span><span>试</span></div>
          <div class="clip-img" v-if="shareUrl !==''"><img :src="shareUrl" alt="" v-on:click="showImgInApp"></div>
      </div>
      </div>
      <div class="save-tips" v-show="!isInApp" v-text="saveTips">长按保存图片</div>
      <div class="btn-wrap" :class="{'is-app':isInApp}">
        <div class="btn-retest" v-on:click="reTest"></div>
        <div class="btn-share"  v-show="isInApp" v-on:click="shareImage"></div>
      </div>
    </div>
    <div class="loading" v-show="isLoading">
      <div class="center">
        <div class="gif"><img src="//valar.huainanhai.com/h5/xiaolu/v1.8/imgs/loading.gif" alt=""></div>
        <div class="tips" v-text="loadingText"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import DownloadBanner from './DownloadBanner'

  import {upload} from '../api/upload'
  import {setWebTitle,showToast,closeWebView} from '../../../lib/js/bridge_1.0'
  import {texts,price,imgLoaded,scaleCanvas,share,handleImg} from '../api/faceplus'
  import VersionLib from '../../../lib/js/versionCheck'
  import Utils from '../../../lib/js/lib'

  const ua = window.navigator.userAgent.toLowerCase();
  const isXl =  /xl|xiaolu/.test(ua);
  const isHnh =  /hnh|huainanhai/.test(ua);
  const isIos =  /iphone/.test(ua);
  export default {
    data() {
      return {
        localImageUrl:'static/images/XIAOLU.png',//选择文件后的本地地址
        imageUrl:'',//上传后的图片url
        shareUrl:'',//截图成功且上传成功的分享的图片url
        isUploadError:false,//照片是否上传失败
        isShowResult:false,//是否显示结果页
        isUploading:false,//是否正在上传中
        isLoading:false,
        loadingText:'',
        isInApp:false,//isXl || isHnh,
        isIos:isIos,
        price:'',
        text:'',
        saveTips:(isXl || isHnh)?'点击图片保存':'长按图片保存',
        isShowDownloadBanner:!(VersionLib.isXl || VersionLib.isHnh),
      }
    },
    components:{
      DownloadBanner
    },
    mounted(){
      setWebTitle('测一测你的颜值多少钱?');
      Utils.clickReport('2017双11活动页',true);
    },
    methods: {
      uploadHandle(e){
        if(VersionLib.isXl && VersionLib.versionCheck('1.9.0.0')<0){
          alert('对不起，您的app版本过低，请先升级app');
          e.stopPropagation();
          e.preventDefault();
          return false;
        }else {
          Utils.clickReport('2017双11活动页_我要测试_按钮点击',true);
        }
      },
      showImgInApp(e){
        if(isXl){
          let imgUrl = e.currentTarget.src;
          let imgJson = {
            list: [imgUrl],
            index: 0
          };
          setTimeout(function () {
            window.location.href = 'xiaolu2.0://photo_gallery/' + JSON.stringify(imgJson);
          },100);
        }
      },
      shareImage() {
        let _this = this;
//        _this.isLoading = false;
        _this.loadingText='正在为您生成您的专属卡片....';
        let clipDom = document.getElementById('clip-container');
        let scale = 2;//图片放大倍数（清晰度）
        let canvas = scaleCanvas(clipDom,scale);//自定义canvas
        html2canvas(clipDom,{
          canvas:canvas,
          scale:scale,
          useCORS:true,
          allowTaint:true,
          width:clipDom.offsetWidth, //dom 原始宽度
          height:clipDom.offsetHeight, //dom 原始高度
          onrendered : function(canvas) {
            try{
              canvas.toBlob(function (file) {
                //上传图片
                upload(file).then(function (url) {
                    //当图片加载到本地以后
                    imgLoaded(url).then(function (imageUrl) {
                      imageUrl = imageUrl+'?imageslim';
                      _this.shareUrl = imageUrl;
                      if(_this.isInApp){
                        share(imageUrl);
                      }
                      console.log(imageUrl);
                      _this.isLoading = false;//关闭loading状态
                    });
                  });
              },'image/png',1);
            }catch (e){
              console.log(e);
              _this.isLoading = false;
              alert('对不起，生成图片失败');
//              Utils.clickReport('生成图片失败')
            }
          }
        });
      },
      reTest() {
        this.isShowResult = false;
        this.localImageUrl = 'static/images/XIAOLU.png';
        this.shareUrl = '';
        this.isLoading = false;
      },
      imgChange(e) {
        let _this = this;
        _this.isUploading = true;
        _this.isLoading = true;
        _this.loadingText = '正在上传照片中...';
        let file = e.srcElement.files[0];
        this.localImageUrl = URL.createObjectURL(file);
        let Orientation = null;
        //获取照片方向角属性，用户旋转控制
        EXIF.getData(file, function() {
          EXIF.getAllTags(this);
          //获取图片的信息
          Orientation = EXIF.getTag(this, 'Orientation');
          //处理图片
          handleImg(Orientation,_this.localImageUrl).then(function (url) {
            _this.imageUrl = url ;
            _this.isUploading = false;
          });
        });
      }
    },
    watch: {
      imageUrl: function () {
        let _this = this;
        _this.loadingText = '正在检测您的颜值...';
        //生成随机文案
        let priceRandom = Math.floor(Math.random()*(price.length+1));
        let textRandom = Math.floor(Math.random()*(texts.length+1));
        _this.price = price[priceRandom];
        _this.text = texts[textRandom];
        setWebTitle('测试结果');
        if(!_this.isInApp){
          setTimeout(function () {
            _this.shareImage();
          },1000);
        }else{//如果是app
//          _this.isLoading = false;
        }
        _this.isShowResult = true;
      }
    }
  }
</script>
