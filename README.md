# 资源与笔记

### 字体工具
http://lab.puahome.com/web/font/spider
http://font-spider.org(压缩)

### nginx rewrite
example: rewrite ^([^\.]*)/gs/([\w]+)/([\w]+)/([\w]+)$ $1/gs.html break;
rewrite ^/sem([^\.]*)  /topic/sem$1/index.html  last;
意思是访问   /semxxx 开头的uri，就会转发到   /topic/semxxxx/index.html

修改
vi /etc/nginx/conf.d/www.xxx.com    tab自动补全
i键  进入编辑模式    
编辑后  按esc键
:wq 保存当前编辑       :q! 不保存退出
重启 /etc/init.d/nginx reload       /usr/sbin/nginx -s reload

### linux 操作
rz 上传    rz -y覆盖上传

下载一个文件
sz filename 

下载多个文件
sz filename1 filename2
	
下载dir目录下的所有文件，不包含dir下的文件夹
sz dir/*

### fastclick.js
 window.addEventListener( "load", function() {
    FastClick.attach( document.body );
}, false );

### css
-ios滚动
-webkit-overflow-scrolling: touch; 
-ios取消跳转高亮
-webkit-tap-highlight-color: rgba(0,0,0,0);
- retina屏1px
 .border1px:after { 
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    border-bottom: 1px solid #e4e4e4;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    box-sizing: border-box;
    pointer-events: none;
}
- 超出两行隐藏
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;

##命令行传参    
const minimist = require('minimist');
let knownOptions = {
	string: ['path','type'],
	default: { path: 'index',type: 'normal' }
};
let args = minimist(process.argv.slice(2), knownOptions);

##### MongoError: Cursor not found, cursor id: 111574020418  mongodb数据库是否加索引

### debug
export const loadScript = (url, callback) => {
 const script = document.createElement('script')
 script.onload = () => callback()
 script.src = url
 document.body.appendChild(script)
}

loadScript(
'https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/vconsole/3.0.0/vconsole.min.js',
 () => {
// eslint-disable-next-line
new VConsole()
 })
