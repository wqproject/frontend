# ��Դ��ʼ�

### ���幤��
http://lab.puahome.com/web/font/spider
http://font-spider.org(ѹ��)

### nginx rewrite
example: rewrite ^([^\.]*)/gs/([\w]+)/([\w]+)/([\w]+)$ $1/gs.html break;
rewrite ^/sem([^\.]*)  /topic/sem$1/index.html  last;
��˼�Ƿ���   /semxxx ��ͷ��uri���ͻ�ת����   /topic/semxxxx/index.html

�޸�
vi /etc/nginx/conf.d/www.xxx.com    tab�Զ���ȫ
i��  ����༭ģʽ    
�༭��  ��esc��
:wq ���浱ǰ�༭       :q! �������˳�
���� /etc/init.d/nginx reload       /usr/sbin/nginx -s reload

### linux ����
rz �ϴ�    rz -y�����ϴ�

����һ���ļ�
sz filename 

���ض���ļ�
sz filename1 filename2
	
����dirĿ¼�µ������ļ���������dir�µ��ļ���
sz dir/*

### fastclick.js
 window.addEventListener( "load", function() {
    FastClick.attach( document.body );
}, false );

### css
-ios����
-webkit-overflow-scrolling: touch; 
-iosȡ����ת����
-webkit-tap-highlight-color: rgba(0,0,0,0);
- retina��1px
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
- ������������
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;

##�����д���    
const minimist = require('minimist');
let knownOptions = {
	string: ['path','type'],
	default: { path: 'index',type: 'normal' }
};
let args = minimist(process.argv.slice(2), knownOptions);

##### MongoError: Cursor not found, cursor id: 111574020418  mongodb���ݿ��Ƿ������

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
