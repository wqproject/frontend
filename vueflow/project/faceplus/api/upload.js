import axios from 'axios';
import jsonpAdapter from './axios-jsonp';

function Qiniu_upload(file,token,key) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', "//upload.qiniu.com", true);
    let formData =  new FormData();
    if (key !== null && key !== undefined) {
      formData.append('key', key);
    }
    formData.append('token', token);
    formData.append('file', file);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200 && xhr.responseText !== "") {
          resolve(xhr.responseText);
        } else if (xhr.status !== 200 && xhr.responseText) {
          reject('error');
        }
    };
    xhr.send(formData);
  })
}

export function upload(file) {
  return new Promise((resolve, reject) => {
    axios({
      url: '//m.huainanhai.com/tools/token',
      adapter: jsonpAdapter
    }).then((res) => {
      let key = res.data.key;
      let token = res.data.token;
      Qiniu_upload(file,token,key).then(function () {
        resolve('https://morgoth-aman.huainanhai.com/'+key)
      }).catch((error) => {
        reject('upload image error:'+error);
      });
    });
  });

}
