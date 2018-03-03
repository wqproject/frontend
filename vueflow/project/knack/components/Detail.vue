<template>
	<div class="wrap page-detail" v-bind:class="{more20: isIos}">
        <div class="header"><i @click="goHistory()"></i><span @click="closeWebview()">关闭</span><p>{{pageTitle}}</p></div>
        <div class="content" id="detail">
            <div class="title">{{title}}</div>
            <div class="text" v-html="content"></div>
            <div class="category">
                <router-link
                    :to="{ path: '/'+categoryId,  query: {login_user_id: loginParams.login_user_id,session_id:loginParams.session_id}}">
                    分类来自：{{categoryName}}
                </router-link>
            </div>
            <div class="like-box">
                <div class="like" v-bind:class="{on: like.isFav === 1}" @click="likeChange(0)">
                    <div class="box"><i></i></div>
                    <span>喜欢({{like.favCount}})</span>
                    <transition name="slide-fade">
                        <p class="plus" v-show="showplus">+1</p>
                    </transition>
                </div>
                <div class="unlike" v-bind:class="{on: like.isFav === -1}" @click="likeChange(1)">
                    <div class="box"><i></i></div>
                    <span>吐槽</span>
                </div>
            </div>
            <div class="line20"></div>
            <div class="recommend">
                <p>相关出招</p>
                <div class="list">
                    <div class="card" v-for="item in recommend" v-bind:class="'small0'+item.id%5">
                        <router-link
                            :to="{ params: { id: item.id }, query: {login_user_id: loginParams.login_user_id,session_id:loginParams.session_id}}">
                            <p class="title">{{item.title}}</p>
                            <div class="like-wrap unlike"><i></i><span>{{item.fav_count}}</span></div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <Complain :loginParams="loginParams" v-on:close="closeModle()" v-show="showFeedback"></Complain>
    </div>
</template>

<script>
    import axios from 'axios'
    import Complain from './Complain'
    import proxy from '../common/proxy.js'

    export default {
        name: 'Detail',
        components: {
            Complain
        },
        data () {
            return {
                loginParams: {},
                content: null,
                title: null,
                categoryName: null,
                categoryId: null,
                like: {},
                recommend: [],
                pageTitle: '出招',
                showplus: false,
                showFeedback: false,
                isIos: false
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.getLoginParams();
                this.getData();
                this.getUa();
            });
            // window.addEventListener('scroll', () => {
            //     var dst = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            //     if(dst > 88) {
            //         this.pageTitle = this.title;
            //     }else {
            //         this.pageTitle = '出招';
            //     }
            // });
        },
        beforeRouteEnter (to, from, next) {
            window.location.href = 'xiaolu2.0://load_animation/1';
            next();
        },
        // 路由更新钩子函数
        beforeRouteUpdate (to, from, next) {
            document.getElementById('detail').scrollTop = 0;
            window.location.href = 'xiaolu2.0://load_animation/1';
            next();
            this.getData();
        },
        methods: {
            getLoginParams () {
                this.loginParams = this.$route.query;
            },
            getData () {
                let that = this;
                let id = this.$route.params.id;
                let login_user_id = that.loginParams.login_user_id;
                let session_id = that.loginParams.session_id;
                proxy.get('http://vilya.xiaoluluanzhuang.com/knack/detail?id='+id+'&login_user_id='+login_user_id+'&session_id='+session_id).then((res) => {
                    console.log(res.data);
                    that.title = res.data.title;
                    that.content = res.data.content;
                    that.categoryName = res.data.category_name;
                    that.categoryId = res.data.category_id;
                    that.recommend = res.data.recommend_list;
                    that.like = {
                        favCount: res.data.fav_count,
                        isFav: res.data.is_fav
                    };
                    setTimeout(function() {
                        window.location.href = 'xiaolu2.0://load_animation/0';
                        console.log(_vds)
                        _vds.track("chuzhao_detail_show", { chuzhao_title: res.data.title});
                    }, 0);
                }).catch((err) => {
                    console.log(err);
                });
            },
            goHistory () {
                if(this.$route.query.from && this.$route.query.from==='home') {
                    window.location.href = 'xiaolu://close_webview';
                }else {
                    this.$router.go(-1);
                }
            },
            closeModle() {
                this.showFeedback = false;
            },
            closeWebview() {
                window.location.href = 'xiaolu://close_webview';
            },
            likeChange (isComplain = 0) {
                let that = this;
                let id = that.$route.params.id;
                let is_like = that.like.isFav === 1 ? 0 : 1;
                let login_user_id = that.loginParams.login_user_id;
                let session_id = that.loginParams.session_id;
                if(isComplain) {
                    if(!is_like) {
                        that.like.favCount = that.like.favCount-0-1;
                    }
                    that.like.isFav = -1;
                    that.showFeedback = true;
                    return;
                }
                proxy.get('http://vilya.xiaoluluanzhuang.com/tool_mark/mark?refer_type=3&refer_id='+id+'&is_like='+is_like+'&login_user_id='+login_user_id+'&session_id='+session_id)
                .then((res) => {
                    console.log(res);
                    if(res.rtn === 0) {
                        // 第一次点赞会有提示，客户端自行控制
                        window.location.href='xiaolu2.0://click_favorite';
                        if(is_like) {
                            that.showplus = true;
                            that.like.favCount = that.like.favCount-0+1;
                            setTimeout(function() {
                                that.showplus = false;
                            }, 800);
                        }else {
                            that.like.favCount = that.like.favCount-0-1;
                        }
                        that.like.isFav = is_like;
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            getUa() {
                const userAgent = window.navigator.userAgent.toLowerCase();
                const isIos = /iphone/.test(userAgent);
                if(isIos) {
                    this.isIos = true;
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .page-detail {
        height: 100%;
        background-color: #f9f9f9;
        &.more20 {
            .header {
                padding-top: .4rem;
                span {
                    top: .4rem;
                }
                i {
                    top: .66rem;
                }
            }
            .content {
                padding-top: 1.28rem;
            }
        }
        .wrap {
            position: relative;
            background-color: #f9f9f9;
        }
        .more2line {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .header {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: .88rem;
            line-height: .88rem;
            text-align: center;
            font-size: .36rem;
            color: #303030;
            background-color: #fff;
            z-index: 9;
            p {
                max-width: 44%;
                height: 100%;
                margin: 0 auto;
                overflow: hidden;
                text-align: center;
                text-overflow: ellipsis;
                white-space: nowrap
            }
            i {
                position: absolute;
                top: .26rem;
                left: .3rem;
                width: .64rem;
                height: .36rem;
                background-image: url(../assets/imgs/bigright-icon.png);
                background-size: 100%;
                background-repeat: no-repeat;
                background-position: center;
            }
            span {
                position: absolute;
                top: 0;
                left: .93rem;
                font-size: .32rem;
                color: #303030;
            }
            &:after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 200%;
                height: 200%;
                border-bottom: 1px solid #f3f3f3;
                -webkit-transform: scale(0.5);
                transform: scale(0.5);
                -webkit-transform-origin: 0 0;
                transform-origin: 0 0;
                box-sizing: border-box;
                pointer-events: none;
            }
        }
        .content {
            height: 100%;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            padding: .88rem 0 0;
            background-color: #fff;
            box-sizing: border-box;
            div.title {
                margin: .72rem 0 .72rem;
                padding: 0 .3rem;
                font-size: .46rem;
                font-weight: 600;
                color: #303030;
                line-height: 1.4;
            }
            .text {
                padding: 0 .3rem;
                p {
                    font-size: .34rem;
                    color: #666;
                    line-height: .6rem;
                    strong {
                        display: inline-block;
                        margin-bottom: .4rem;
                        line-height: 1;
                        font-size: .34rem;
                        font-weight: 600;
                        color: #444;
                    }
                }
            }
            .category {
                margin-top: 1rem;
                padding: 0 .3rem;
                text-align: right;
                a {
                    font-size: .3rem;
                    color: #ffa000;
                    line-height: 1;
                }
            }
        }
        .line20 {
            width: 100%;
            height: .2rem;
            background-color: #f9f9f9;
        }
        .recommend {
            padding: .6rem .3rem;
            background-color: #fff;
            p {
                margin-bottom: .4rem;
                font-size: .32rem;
                color: #444;
                font-weight: 600;
            }
            .list {
                display: flex;
                justify-content: space-between;
                a {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 3.34rem;
                    height: 4rem;
                    padding-left: .4rem;
                    padding-right: .4rem;
                    box-sizing: border-box;
                    border-radius: .1rem;
                    .title {
                        margin-bottom: .4rem;
                        font-size: .34rem;
                        font-weight: 600;
                        color: #333;
                        line-height: 1.4;
                        @extend .more2line;
                    }
                }
                .like-wrap {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #999;
                    font-size: .28rem;
                    i {
                        width: .26rem;
                        height: .26rem;
                        margin-right: .12rem;
                        background-size: 100%;
                        background-repeat: no-repeat;
                    }
                }
                .like i {
                    background-image: url(../assets/imgs/slike.png);
                }
                .unlike i {
                    background-image: url(../assets/imgs/sunlike.png);
                }
            }
        }
        .like-box {
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-top: 1.6rem;
            margin-bottom: 1rem;
            padding: 0 .3rem;
            &>div {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
            }
            .box {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 1.4rem;
                height: 1.4rem;
                margin-bottom: .3rem;
                border-radius: 50%;
                border: .04rem solid #f3f3f3;
                i {
                    display: block;
                    width: .5rem;
                    height: .5rem;
                    background-size: 100%;
                    background-repeat: no-repeat;
                }
            }
            .like {
                i {
                    background-image: url(../assets/imgs/unlike2.png);
                }
                &.on {
                    .box {
                        border: .04rem solid #fee8e7;
                    }
                    i {
                        background-image: url(../assets/imgs/like2.png);
                    }
                }
            }
            .like {
                position: relative;
            }
            .unlike {
                i {
                    background-image: url(../assets/imgs/complain.png);
                }
                &.on {
                    .box {
                        border: .04rem solid #e4f4fd;
                    }
                    i {
                        background-image: url(../assets/imgs/complain2.png);
                    }
                }
            }
            span {
                color: #303030;
                font-size: .28rem;
            }
        }
        .small00 {
            background-image: url(../assets/imgs/small00.png);
            background-size: 100%; 
        }

        .small01 {
            background-image: url(../assets/imgs/small01.png);
            background-size: 100%; 
        }

        .small02 {
            background-image: url(../assets/imgs/small02.png);
            background-size: 100%; 
        }

        .small03 {
            background-image: url(../assets/imgs/small03.png);
            background-size: 100%; 
        }

        .small04 {
            background-image: url(../assets/imgs/small04.png);
            background-size: 100%; 
        }
        .slide-fade-enter-active {
            transform: scale(1.2);
            transition: all .8s ease;
        }
        .slide-fade-enter, .slide-fade-leave-to {
            transform: translateY(20px);
            opacity: 0;
        }
        .plus {
            position: absolute;
            top: 0;
            left: 38%;
            color: #fe726c;
        }
    }
</style>
