/*
    版本号等相关判断
    林自爽 继承 何勇代码 优化
    2017/05/18
*/
var versionLib = (function () {
  var lib = {};
  var userAgent = window.navigator.userAgent.toLowerCase();
  //是否是安卓
  lib.isAndroid =  /android/.test(userAgent);
  //是否是ios
  lib.isIos =  /iphone/.test(userAgent);
  //是否是小鹿app
  lib.isXl =  /xiaolu_/.test(userAgent);
  //是否坏男孩app
  lib.isHnh =  /hnh_/.test(userAgent);
  //是否复合大师app
  lib.isFrozen =  /frozen_/.test(userAgent);
  //版本号
  lib.version = '';
  //是否是测试版本
  lib.is_beta = false;
  //初始化
  _init();

  function _init() {
    var version = _get('version');
    var ua_version = null;
    //A方案 从url取version 参数
    if(version){
      lib.is_beta = /beta/.test(version);
      lib.version = version !== null && version !== undefined ? version.split(/[-_]/)[0]:'';
      //B方案 从ua取
    }else{
      //判断是否是测试版本
      if(lib.isXl || lib.isHnh || lib.isFrozen){
        lib.is_beta = /beta/.test(userAgent);
      }

      //获取版本号
      if(lib.isXl){
        ua_version = userAgent.match(/xiaolu_([\d\.]+)/);
      }else if(lib.isHnh){
        ua_version = userAgent.match(/hnh_([\d\.]+)/);
      }else if(lib.isFrozen){
        ua_version = userAgent.match(/frozen_([\d\.]+)/);
      }

      lib.version = ua_version && ua_version[1] ? ua_version[1] : '';
    }
  }

  /*
   * to_compare 需要做对比的版本号
   * 返回值
   * 负数 当前版本号比对比版本号小
   * 0 当前版本号与对比版本号相等
   * 正数 当前版本号比对比版本号大
   * undefined 当版本号没有或者传错等情况，为了方便使用者直接用>= 或者 <= 判断，返回了字符串，因为如果返回布尔值false，false>=0 或者 false<=0返回值都是true，这样区分不了是没传还是符合，而undefined<=0 或者 undefined>=0 返回的都是false
   */
  lib.versionCheck = function (to_compare) {
    //判断
    if(!this.version || !to_compare || typeof to_compare !== 'string') return undefined;

    //分割
    var to_compare_arr = to_compare.split('.');
    var cur_version_arr = this.version.split('.');

    if(to_compare_arr.length < 4) return undefined;
    if(cur_version_arr.length < 4)cur_version_arr.push(0);

    for (var i = 0; i < to_compare_arr.length; i++) {
      if (to_compare_arr[i] != cur_version_arr[i]) {
        return cur_version_arr[i]-to_compare_arr[i];
      }
    }
    return 0;
  };


  //获取URL的get参数
  function _get(name){
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    let str = window.location.search;
    if(str === '') str = window.location.hash;
    let r = str.substr(1).match(reg);
    if(r!==null)return decodeURIComponent(r[2]); return null;
  }
  return lib;
})();

export default versionLib;
