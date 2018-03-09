/*
小鹿，坏男孩的内链封装库
*/

const userAgent = window.navigator.userAgent.toLowerCase();
const isXl =  /xl|xiaolu/.test(userAgent);
//是否坏男孩app
const isHnh =  /hnh|huainanhai/.test(userAgent);
//是否挽回大师app
const isFrozen =  /frozen/.test(userAgent);
//延迟的时间（ms）
const ts = 10;
/**
 * 打开一个新的页面
 * @param url 新页面url
 */
function newWebView(url) {
  let _url = url;
  if(isXl){
    if(!/^xiaolu:\/\/|^xiaolu2\.0:\/\//.test(url)){
      _url="xiaolu://new_webview/"+url
    }
  }else if(isHnh){
    if(!/^aman:\/\/|^aman2\.0:\/\//.test(url)){
      _url="aman://new_webview/"+url;
    }
  }else if(isFrozen){
    if(!/^frozen:\/\/|^frozen2\.0:\/\//.test(url)){
      _url="frozen://new_webview/"+url;
    }
  }
  setTimeout(function () {
    console.log(_url);
    window.location.href = _url;
  },ts);
}

/**
 * 关闭webview
 */
function closeWebView() {
  let url = '';
  if(isXl){
    url = 'xiaolu://close_webview';
  }else if(isHnh){
    url = 'aman://close_webview';
  }else if (isFrozen) {
    url = 'frozen://close_webview';
  }else {
    window.close();
    return
  }
  setTimeout(function () {
    console.log(url);
    window.location.href = url;
  },ts);
}

/**
 * 跳转一个内链，如果不带内链协议头，则会根据环境默认加上协议
 * @param url 新页面url
 * @param protocolVersion 当没指定协议的时候，需要指定的版本号，默认‘’
 */
function openUrl(url,protocolVersion){
  protocolVersion = protocolVersion || '';
  let _url = url;
  if(isXl){
    if(!/^xiaolu:\/\/|^xiaolu2\.0:\/\//.test(url)){
      _url='xiaolu'+protocolVersion+':'+url
    }
  }else if(isHnh){
    if(!/^aman:\/\/|^aman2\.0:\/\//.test(url)){
      _url='aman'+protocolVersion+':'+url
    }
  }else if(isFrozen){
    if(!/^frozen:\/\/|^frozen2\.0:\/\//.test(url)){
      _url='frozen'+protocolVersion+':'+url
    }
  }else{
    return;
  }
  setTimeout(function () {
    console.log(_url);
    window.location.href = _url;
  },ts);
}

/**
 * 打开一个新的全屏页面
 * @param url 新页面url
 */
function newFullWebView(url) {
  let _url = url;
  if(isXl){
    if(!/^xiaolu:\/\/|^xiaolu2\.0:\/\//.test(url)){
      _url="xiaolu2.0://common_full_screen_webview/"+url
    }
  }else if(isHnh){
    if(!/^aman:\/\/|^aman2\.0:\/\//.test(url)){
      _url="aman2.0://common_full_screen_webview/"+url;
    }
  }else if(isFrozen){
    if(!/^frozen:\/\/|^frozen2\.0:\/\//.test(url)){
      _url="frozen2.0://common_full_screen_webview/"+url;
    }
  }
  setTimeout(function () {
    console.log(_url);
    window.location.href = _url;
  },ts);
}


/**
 * toast 消息提示
 * @param msg
 */
function showToast(msg) {
  let url = '';
  if(isXl){
    url = "xiaolu2.0://prompt_dialog_boxt/"+msg;
  }else if(isHnh){
    url = "aman://show_toast/"+msg;
  }else if (isFrozen) {
    url = "frozen://show_toast/"+msg;
  }else {
    alert(msg);
    return;
  }
  setTimeout(function () {
    console.log(url);
    window.location.href= url;
  },ts);
}

/**
 * 设置页面标题
 * @param msg
 */
function setWebTitle(title) {
  let url = '';
  if(isXl){
    url = "xiaolu2.0://change_nav_title/"+title;
  }else if(isHnh){
    url = "aman2.0://app_get_web_title/"+title;
  }else if (isFrozen) {
    url = "frozen2.0://app_get_web_title/"+title;
  }else{
    document.title = title;
    return;
  }
  setTimeout(function () {
    console.log(url);
    window.location.href = url;
  },ts);
}

/**
 *	跳转登录
 */
function goLogin() {
  let url = '';
  if(isHnh){
    url = 'aman://user_login_new';
  }else if (isFrozen) {
    url = 'frozen2.0://user_login_new';
  }else {
    return false;
  }
  setTimeout(function () {
    console.log(url);
    window.location.href = url;
  },100);
}

/**
 *	自定义指标上报接口
 * @param kpiKey 需要上报的键值名
 */
function kpiReport(kpiKey) {
  let url = '';
  let json = {
    kpi_key:kpiKey,
    kpi_value:1
  };
  if(isHnh){
    url = 'aman2.0://kpi_custom_reporting/'+ JSON.stringify(json);
  }else if (isFrozen) {
    url = 'frozen2.0://kpi_custom_reporting/'+ JSON.stringify(json);
  }else {
    return false;
  }
  setTimeout(function () {
    console.log(url);
    window.location.href = url;
  },500);
}
export {
  newWebView,
  closeWebView,
  openUrl,
  newFullWebView,
  showToast,
  setWebTitle,
  goLogin,
  kpiReport
};
