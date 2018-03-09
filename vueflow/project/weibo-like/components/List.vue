<template>
    <div class="hello">
        <div class="back"><router-link to="/">返回</router-link></div>
        <div class="photo-list">
            <img class="small" v-lazy="item.pic_small" v-for="(item, index) in picList" @click="_big(item, index)">
            <div class="loading" v-show="is_loading">加载中...</div>
            <div class="big-photo" v-show="is_view" @click="_hide()">
                <img :src="big_img">
                <div class="like-user" @click="_like_user()">此图点赞用户</div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../api'

export default {
    data() {
        return {
            uid: this.$route.query.uid,
            page: 1,
            picList: [],
            is_loading: false,
            is_view: false,
            big_img: '../static/loading.gif',
            index: 0,
            mid: ''
        }
    },
    created() {
        this.loadPage();
    },
    mounted(){
        window.addEventListener('scroll',()=>{
            if(this.getScrollTop() + window.innerHeight > document.body.offsetHeight - 100) {
                if(this.is_loading)return;
                this.page++;
                this.loadPage();
            }
        },false);

        var start_x = 0;

        window.addEventListener('touchstart',(e)=>{
            start_x = e.touches[0].clientX;
        },false);

        window.addEventListener('touchend',(e)=>{
            var clientX = e.changedTouches[0].clientX;
            if(clientX - start_x > 50){//查看上一张
                this.prev();
            }
            else if(start_x - clientX > 50){//查看下一张
                this.next();
            }
        },false);
    },
    methods: {
        _hide (){
            this.is_view = false;
        },
        getScrollTop() {
            var scrollTop=0;
            if(document.documentElement&&document.documentElement.scrollTop){
                scrollTop=document.documentElement.scrollTop;
            }
            else if(document.body){
                scrollTop=document.body.scrollTop;
            }
            return scrollTop;
        },
        loadPage(){
            this.is_loading = true;
            api.LoadPhotoPage(this.uid, this.page).then(res => {
                this.is_loading = false;
                if(this.picList.length>300){
                    this.index = 0;
                    this.picList = [];
                    window.scroll(0,0);
                }
                for(var i in res.pics){
                    res.pics[i]['pic_small'] = res.pics[i]['pic_small'].replace(/(https?:\/\/.*?\/).*?(\/.*)/,'$1thumb150$2');
                }
                this.picList = this.picList.concat(res.pics);
            })
        },
        _big(item, index) {
            var url = item.pic_ori;
            this.big_img = url;
            this.is_view = true;
            this.index = index;

            try{
                this.mid = item.mblog.mid;
            }catch(e){
                this.mid = '';
            }

            api.addPhoto(url);
        },
        prev() {
            if(this.index<=0)return;
            this.index--;
            this._big(this.picList[this.index], this.index);
        },
        next() {
            if(this.index>=this.picList.length-1)return;
            this.index++;
            this._big(this.picList[this.index], this.index);
        },
        _like_user() {
            if(this.mid){
                this.$router.replace({path:'/like_user', query:{mid:this.mid}});
            }else{
                //...
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.like-user{
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    color: #fff;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #fff;
    background: #000;
}

.back{
    padding:0.5rem;
}

.big-photo{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #000;
    img{
        max-width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
}
.loading{
    display: block;
    width: 100%;
    text-align: center;
}
.photo-list{
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    .small{
        width:33vw;
        height:33vw;
        margin-bottom: 1vw;
    }
}
</style>
