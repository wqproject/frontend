<template>
    <div class="hello">
        <div class="back"><router-link to="/">返回</router-link></div>
        <div class="user" v-for="(item, index) in userLists">
            <div class="name" @click="_go(item.uid)">{{item.name}}</div>
            <div class="close" @click="_del(item.uid)">删除</div>
        </div>
    </div>
</template>

<script>
import api from '../api'

export default {
    data() {
        return {
            userLists: [],
        }
    },
    created() {
        api.getUser().then(res => {
            console.log(res);
            this.userLists = res;
        });
    },
    methods: {
        _go(uid) {
            this.$router.replace({path:'/list', query:{uid:uid}})
        },
        _del(uid) {
            api.delUser(uid);

            for(var i in this.userLists){
                if(this.userLists[i]['uid'] == uid){
                    this.userLists.splice(i,1);
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.back{
    padding: 0.5rem;
}
.user{
    padding: 0.5rem;
    .name{
        display:inline;
    }
    .close{
        float:right;
    }
}
</style>
