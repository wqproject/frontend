/*
  ====================================================================
  1、onerror捕获JavaScript异常
  2、addEventListener('error', handler, true)来捕获静态资源异常，包括js、img、css等；
  3、Resource Timing API 和 Performance Timing API来进行性能检测和内存检测；
  目前以实现：1;
  ====================================================================
   */
(function (global) {
  //确保只执行一次
  if(window.onerror && window.onerror.name === 'errorHandle') return false;

  let host = '//m.ixiaolu.com/jordan/wap_error_handle/error_report';

  //已绑定的错误处理函数
  let linkedErrorHandle = window.onerror || function () {};

  function errorHandle(errorMessage, scriptURI, lineNumber, columnNumber,error){
    let errorString = _getErrorInfo(errorMessage, scriptURI, lineNumber, columnNumber);
    //没有详细信息以及URL不上报！上报也不知道错误
    if (errorString !== ''){
      //上报错误信息
      _errorReport(errorString);
    }else {
      return true;
    }
    //如果绑定有其它的错误处理函数，则继续执行完其它的错误处理函数
    linkedErrorHandle(errorMessage, scriptURI, lineNumber, columnNumber,error);
  }
  window.onerror=errorHandle;//绑定错误处理函数
  /*
  * 获取JS自定义错误信息
  */
  function _getErrorInfo(errorMessage, scriptURI, lineNumber, columnNumber) {
    let str ='';
    //参数检查，如果有没有有的，不上报
    if(typeof errorMessage !== 'string' || !scriptURI || scriptURI === '' || !lineNumber || lineNumber === 0){
      return str;
    }
    //如果是跨域js没有权限，则不上报
    if(location.href === scriptURI && lineNumber === 1){
      return str;
    }
    str =location.href.split('?')[0]+ '>\''+errorMessage+' \'at '+ scriptURI.split('?')[0]+'@'+lineNumber+':'+ (columnNumber||0);
    return str;
  }
  /*
   * 上报信息
   */
  function _errorReport(errorString,type) {
    type= type || 1;
    let url = host+'?type='+type+'&error_info='+errorString;
    let img = new Image;
    img.onload = img.onerror = function(){
      img = null;
    };
    setTimeout(function () {
      img.src = url;//发送数据到后台
    },100);
  }

  /**
   * 自定义上报信息
   * @param errorString {String}上报的信息
   */
  global.userErrorReport = function(errorString) {
    errorString = location.href.split('?')[0]+ '>'+errorString.toString()+'';
    _errorReport(errorString,2);
  };
  /**
   * 设置host
   * @param userHost
   */
  global.setHost = function(userHost) {
    host = userHost;
  }
})(this);


/*debug 功能*/
(function () {
  let flag = false;
  document.addEventListener('touchstart',function (evt) {
    if(evt.touches.length>=5){
      if(flag) return;
      flag = true;
      let src = '//valar.huainanhai.com/common/lib/eruda.min.js';
      if(confirm('是否加载调试模式')){
        loadScript(src,function () {
          eruda.init();
        });
      }
    }
  });
  function loadScript(url, callback){
    let script = document.createElement ("script");
    script.type = "text/javascript";
    if (script.readyState){ //IE
      script.onreadystatechange = function(){
        if (script.readyState === "loaded" || script.readyState === "complete"){
          script.onreadystatechange = null;
          callback();
        }
      };
    } else { //Others
      script.onload = function(){
        callback();
      };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }
})();

const XL = {
};

function getParamsByHash() {
  let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  let r = window.location.hash.substr(1).match(reg);
  if(r!=null)return  unescape(r[2]); return null;
}

export default XL;
