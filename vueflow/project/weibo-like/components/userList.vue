<template>
    <div class="hello">
        <h2>搜索结果</h2>
        <div class="user" v-for="(item, index) in userLists" @click="_go(item.user.id, item.user.screen_name)">
            <img class="avatar" :src="item.user.avatar_large">
            <div class="desc">
                <div class="name">{{item.user.screen_name}}</div>
                <div class="sign">{{item.desc1}}</div>
                <div class="fans">{{item.desc2}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../api'

export default {
    props: ['userLists'],
    methods: {
        _go(uid, name) {
            api.addUser(uid, name);
            this.$router.replace({path:'/list', query:{uid:uid}})
        }
    }
}
</script>

<style lang="scss" scoped>
h2{
    font-weight: normal;
    font-size: 1rem;
    padding: 1rem;
    border-top: 1px solid #efefef;
    border-bottom: 1px solid #efefef;
}
.user{
    min-height: 4rem;
    border-bottom:1px solid #efefef;
    position: relative;
    .avatar {
        border-radius:50%;
        width: 3rem;
        position: absolute;
        left: 1rem;
        top: 0.5rem;
    }
    .desc {
        padding-left:80px;
        .name {
            font-size: 1rem;
            margin: 0.4rem 0;
        }
        .sign {
            font-size: 0.8rem;
            margin-bottom: 0.4rem;
            width: 500%;
        }
        .fans {
            font-size: 0.8rem;
        }
    }
}
</style>
