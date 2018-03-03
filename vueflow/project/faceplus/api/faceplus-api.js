//        FaceSDK.detect(this.imageUrl, function (data) {
//          let score;
//          if (data.faces && data.faces.length === 0) {
//            //传的照片没有人脸
//
//          } else if (data.faces && data.faces.length > 1) {
//            //有多个人脸
//          } else {
//            //获取平均分数
//            score = data.faces[0].attributes.beauty.female_score + data.faces[0].attributes.beauty.male_score;
//            this.score = Math.floor(score / 2);
//          }
//
//          console.log(data);
//        });

import axios from 'axios';
import jsonpAdapter from './axios-jsonp';

const apiKey = '1tvh7HMPiFciVYy9PGXcHBm5b2CcLFy-';
const apiSecret = 'BmNF3tbMlDZSK0NISsEiFrw43tX5VGP3';

//正式
// const apiKey = 'Dusf2EpSQmJO72j2GShWH0C-TJZKHj9n';
// const apiSecret = 'FRvLWpeSexDapIuagtEjOtDyRlPb8h5D';


const FaceSDK  = {
  detect: function (imageUrl,callback) {
    const detectUrl = 'https://api-cn.faceplusplus.com/facepp/v3/detect';
    const prams = {
      proxy_url:detectUrl,
      api_key:apiKey,
      api_secret:apiSecret,
      image_url:imageUrl,
      return_attributes:'beauty'
    };
    axios({
      url:'//m.ixiaolu.com/jordan/proxy',
      method:'POST',
      params:prams
    }).then(response => {
        callback(response.data);
      }, err => {
        console.log('FaceSDK detect error:'+err);
      })
      .catch((error) => {
        console.log('FaceSDK detect error:'+error);
      });
  }
};
export default FaceSDK;
