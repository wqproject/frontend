import axios from 'axios'
import db from './indexeddb'
import db_u from './indexeddb_user'


axios.defaults.timeout = 10000;

export function fetchGet(url) {
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export default {
    //搜索用户
    Search(name) {
        var fid = encodeURIComponent('100303type=3&q='+name+'&t=3');
        var url = 'https://api.weibo.cn/2/cardlist?networktype=wifi&uicode=10000003&moduleID=708&featurecode=10000085&wb_version=3472&c=android&i=373870b&s=ec1d46da&ft=0&ua=Xiaomi-Redmi%20Note%204X__weibo__7.10.0__android__android6.0.1&wm=20005_0002&aid=01ArjpCveqntRDwMarzTzwFs_0Auw-9edgqvNj2HJe5wcWxlU.&fid='+fid+'&uid=1877034455&v_f=2&v_p=53&from=107A095010&gsid=_2A2505wGhDeTxGedG7FUR8yrIzjmIHXVVeJlErDV6PUJbkdAKLVOtkWoNtaFjVOww1i23QqYFyVfrJIcACw..&imsi=460013080513158&lang=zh_CN&lfid=231091&page=1&skin=default&count=10&oldwm=20005_0002&sflag=1&containerid='+fid+'&luicode=10000010&need_head_cards=0';
        return fetchGet('http://139.199.79.226/proxy.php?url='+encodeURIComponent(url));
    },

    //加载点赞相册
    LoadPhotoPage(uid, page) {
        var url = 'https://api.weibo.cn/2/container?networktype=wifi&uicode=10000012&moduleID=700&featurecode=10000085&wb_version=3472&c=android&i=373870b&s=ec1d46da&ft=0&ua=Xiaomi-Redmi Note 4X__weibo__7.10.0__android__android6.0.1&wm=20005_0002&aid=01ArjpCveqntRDwMarzTzwFs_0Auw-9edgqvNj2HJe5wcWxlU.&fid=107803'+uid+'_-_photolike&v_f=2&v_p=53&from=107A095010&gsid=_2A2505wGhDeTxGedG7FUR8yrIzjmIHXVVeJlErDV6PUJbkdAKLVOtkWoNtaFjVOww1i23QqYFyVfrJIcACw..&lang=zh_CN&lfid=230283'+uid+'&page='+page+'&skin=default&count=24&oldwm=20005_0002&sflag=1&containerid=107803'+uid+'_-_photolike&luicode=10000198';
        return fetchGet('http://139.199.79.226/proxy.php?url='+encodeURIComponent(url));
    },

    //点赞用户列表
    LikeUser(mid, page) {
        var url = 'https://api.weibo.cn/2/like/show?networktype=wifi&uicode=10000002&moduleID=700&featurecode=10000085&wb_version=3472&c=android&i=373870b&s=ec1d46da&ft=0&id='+mid+'&ua=Xiaomi-Redmi%20Note%204X__weibo__7.10.0__android__android6.0.1&wm=20005_0002&aid=01ArjpCveqntRDwMarzTzwFs_0Auw-9edgqvNj2HJe5wcWxlU.&v_f=2&v_p=53&from=107A095010&gsid=_2A2504T3nDeTxGedG7FUR8yrIzjmIHXVVeJlErDV6PUJbkdAKLVOtkWpsnj2WgnktDSqaznn27z8RD9zdNg..&lang=zh_CN&page='+page+'&skin=default&type=0&count=50&oldwm=20005_0002&sflag=1&luicode=10000074&filter_by_author=0&filter_by_source=0';
        return fetchGet('http://139.199.79.226/proxy.php?url='+encodeURIComponent(url));
    },

    //查看用户，则加到本地数据库
    addUser(uid, name){
        db_u.save({uid:uid,name:name});
    },

    //删除用户
    delUser(uid){
        db_u.delete(uid);
    },

    //读取用户
    getUser(){
        return new Promise((resolve, reject) => {
            db_u.getAll(data => {
                resolve(data);
            });
        });
    },

    //查看大图，则加到本地数据库
    addPhoto(url){
        db.save({url:url});
    },

    //读取本地数据库
    getPhotoList(page){
        return new Promise((resolve, reject) => {
            db.getPage(page, data => {
                var arr = [];
                for(var i in data){
                    arr.push(data[i]['url']);
                }
                resolve(arr);
            });
        });
    }

}


