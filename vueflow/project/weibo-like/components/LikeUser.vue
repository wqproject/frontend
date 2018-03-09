<template>
    <div class="search-list">
        <div class="back"><router-link to="/">返回</router-link></div>
        <v-user-list :user-lists="searchLists"></v-user-list>
        <div class="loading" v-show="is_loading">加载中...</div>
    </div>
</template>

<script>
import userList from '@/components/userList'
import api from '../api'

export default {
    components: {
        'v-user-list': userList,
    },
    data() {
        return {
            mid: this.$route.query.mid,
            searchLists: [],
            is_loading: false,
            page: 1
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
    },
    methods: {
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
        loadPage() {
            this.is_loading = true;
            api.LikeUser(this.mid, this.page).then(res => {
                this.is_loading = false;
                var users = [];
                for(var i in res.users){
                    users.push({
                        user:{
                            id: res.users[i]['idstr'],
                            avatar_large: res.users[i]['avatar_large'],
                            screen_name: res.users[i]['screen_name']
                        },
                        desc1: res.users[i]['description'],
                        desc2: '粉丝：'+res.users[i]['followers_count']
                    });
                }
                this.searchLists = this.searchLists.concat(users);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.search-list{
    margin-top:1rem;
    width: 100%;
    overflow: hidden;
}
.loading{
    display: block;
    width: 100%;
    text-align: center;
}
</style>
