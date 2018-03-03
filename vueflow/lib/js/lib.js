import axios from 'axios';
import jsonpAdapter from './axios-jsonp';
//formatTime
function format(d, pattern){
  let o = {
    "m+" : d.getMonth()+1, //month
    "d+" : d.getDate(), //day
    "H+" : d.getHours(), //hour
    "i+" : d.getMinutes(), //minute
    "s+" : d.getSeconds(), //second
    "S" : d.getMilliseconds() //millisecond
  };

  if(/(y+)/.test(pattern)) {
    pattern = pattern.replace(RegExp.$1, (d.getFullYear()+"").substr(4 - RegExp.$1.length));
  }

  for(let k in o) {
    if(new RegExp("("+ k +")").test(pattern)) {
      pattern = pattern.replace(RegExp.$1, RegExp.$1.length===1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
    }
  }
  return pattern;
}
//数据上报
function clickReport(rp_txt,isPv) {
  let url = '//m.huainanhai.com/app/sem_click.php?name=' + rp_txt;
  if(isPv){
    url = '//m.huainanhai.com/app/sem_click.php?pv=1&name=' + rp_txt;
  }
  setTimeout(function () {
    axios({
      url:url,
      adapter:jsonpAdapter
    }).then(() => console.log(rp_txt+'____上报成功'), () => console.log(rp_txt+'____上报失败'))
      .catch(() => console.log(rp_txt+'____上报失败'));
  },500);
}

let tools = {
  format,
  clickReport
};



export default tools;
