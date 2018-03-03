<template>
  <div class="hello">
    <h1>微博秋名山</h1>
    <input class="search-name" type="text" v-model="keywords" placeholder="搜索微博用户">
    <div @click="_search()" class="btn">搜索</div>

    <h3>工具说明：用于查看微博用户的点赞图片</h3>

    <div class="other">
        <router-link to="/history">历史相册</router-link>
        <router-link to="/history_user">历史用户</router-link>
    </div>

    <h2>最新搜索</h2>
    <ul class="clr">
        <li class="keyword" @click="_search(keyword)" v-for="(keyword, index) in keywordList">{{index+1}}.{{keyword}}</li>
    </ul>

    <div class="search-list">
        <v-user-list :user-lists="searchLists" v-if="show"></v-user-list>
    </div>
  </div>
</template>

<script>
import userList from '@/components/userList'
import api from '../api'

export default {
    components: {
        'v-user-list': userList,
    },
    data () {
        return {
            show: false,
            keywords: '',
            searchLists: [],
	    keywordList: []
        }
    },
    created() {
        //从leanCloud读取
        var keyword_list = [];
        var cql = 'select * from recent_search_keyword order by updatedAt desc limit 20';
        AV.Query.doCloudQuery(cql).then(data => {
            var results = data.results;
            for(var i in results){
                keyword_list.push(results[i]['attributes']['keyword']);
            }
            this.keywordList = keyword_list;
        });
    },
    methods: {
        updateKeyword(keyword) {
            //写入leanCloud
            var cql = 'select * from recent_search_keyword where keyword=?';
            AV.Query.doCloudQuery(cql, [keyword]).then(data => {
                if(data.results.length>0){
                    var keywordObj = AV.Object.createWithoutData('recent_search_keyword', data.results[0]['id']);
                    keywordObj.set('keyword',keyword);
                    keywordObj.save();
                }else{
                    var RecentSearchKeyword = AV.Object.extend('recent_search_keyword');
                    var keywordObj = new RecentSearchKeyword();
                    keywordObj.set('keyword',keyword);
                    keywordObj.save();
                }
            });
        },
        _search(keyword) {
            this.show = true

            var _k = keyword?keyword:this.keywords;

            api.Search(_k).then(res => {
                try{
                    if(res.cards[1]['card_group'].length>0){
                        this.updateKeyword(_k);
                        this.searchLists = res.cards[1]['card_group'];
                    }
                }catch(e){
                }
            })
        }
    }
}
</script>

<style scoped>
.clr:after,.wrap:after{content:".";clear:both;display:block;height:0;visibility:hidden;}
.clr,.wrap{zoom:1;}

h1 {
    font-weight: normal;
    font-size: 1.4rem;
    padding: 1rem;
}

h2 {
    font-weight: normal;
    font-size: 1rem;
    padding: 1rem;
}

h3 {
    font-size:0.6rem;
    padding: 0.5rem 1rem;
}

.other {
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #efefef;
}

li {
    float: left;
}

.keyword{
    padding: 0 0 0.4rem 1rem;
}

.search-list{
    margin-top: 1rem;
}

.search-name{
    margin-left: 1rem;
    border: 1px solid #efefef;
    padding: 0.5rem;
    width: 8rem;
}

.btn{
    border:1px solid #efefef;
    color:#fff;
    background-color:#ff8420;
    border-radius:10px;
    padding:0.5rem 1rem;
    display: inline-block;
}
</style>
