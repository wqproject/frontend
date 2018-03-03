<style scoped lang="scss">
  .upload-img-btn{
    width: 2rem;
    height: .8rem;
    background: #fa8400;
    color:#fff;
    input{
      opacity: 0;
    }
  }
  img{
    width: 100%;
  }
</style>
<template>
    <div class="imgload">
        <img :src='imageUrl'>
        <div class="upload-img-btn" v-on:click='uploadHandle'>选择文件
          <input type="file" accept="image/*" multiple='multiple' v-on:change='imgChange'>
        </div>
    </div>
</template>

<script>
    import FaceSDK from '../api/faceplus-api'
    import {upload} from '../api/upload'
    export default{
        data(){
            return{
                msg:'hello vue',
                localImageUrl:'',
                imageUrl:'',
                score:0
            }
        },
        components:{
        },
        methods:{
          uploadHandle(){
          },
          imgChange(e){
            let file = e.srcElement.files[0];
            let formData = new FormData();
            formData.append('file',file);
            this.localImageUrl = URL.createObjectURL(file);
            let _self = this;
            upload(file)
              .then(function(imageUrl){
                _self.imageUrl = imageUrl;
              });
          }
        },
        watch:{
          imageUrl:function(){
            let _this = this;
            FaceSDK.detect(this.imageUrl,function (data) {
              let score;
              if(data.faces && data.faces.length === 0){
                //传的照片没有人脸

              }else if(data.faces && data.faces.length > 1){
                //有多个人脸
              }else{
                //获取平均分数
                score = data.faces[0].attributes.beauty.female_score+data.faces[0].attributes.beauty.male_score;
                this.score = Math.floor(score/2);
              }

              console.log(data);
            });
          }
        }
    }
</script>
