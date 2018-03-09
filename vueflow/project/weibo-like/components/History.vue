<template>
    <div class="hello">
        <div class="back"><router-link to="/">返回</router-link></div>
        <div class="photo-list">
            <img class="small" v-lazy="item.pic_small" v-for="(item, index) in picList" @click="_big(item.pic_ori, index)">
            <div class="big-photo" v-show="is_view" @click="_hide()">
                <img :src="big_img">
            </div>
        </div>
    </div>
</template>

<script>
import api from '../api'

export default {
    data() {
        return {
            page: 1,
            is_end: 0,
            picList: [],
            is_view: false,
            big_img: '',
            index: 0
        }
    },
    created() {
        this.loadPage();
    },
    mounted(){
        window.addEventListener('scroll',()=>{
            if(this.getScrollTop() + window.innerHeight >= document.body.offsetHeight) {
                if(this.is_end)return;
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
            api.getPhotoList(this.page).then(res => {
                if(this.picList.length>300){
                    this.index = 0;
                    this.picList = [];
                    window.scroll(0,0);
                }

                var pics = [];
                for(var i in res){
                    pics.push({pic_ori:res[i], pic_small:res[i].replace(/(https?:\/\/.*?\/).*?(\/.*)/,'$1thumb150$2')});
                }
                this.picList = this.picList.concat(pics);
            })
        },
        _big(url, index) {
            this.big_img = url;
            this.is_view = true;
            this.index = index;
        },
        prev() {
            if(this.index<=0)return;
            this.index--;
            this._big(this.picList[this.index]['pic_ori'], this.index);
        },
        next() {
            if(this.index>=this.picList.length-1)return;
            this.index++;
            this._big(this.picList[this.index]['pic_ori'], this.index);
        }
    }
}
</script>

<style lang="scss" scoped>
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
