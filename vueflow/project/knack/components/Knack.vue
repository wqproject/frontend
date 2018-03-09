<template>
	<div class="wrap index" v-bind:class="{more20: isIos}">
        <div class="header"><i @click="goHome()"></i>出招</div>
        <div class="nav-wrap">
            <div class="nav-bar">
                <div class="category" v-for="item in nav">
                    <router-link  active-class="on" v-on:click.native="scrollToActive()"
                        :to="{ params: { category: item.category_id }, query: {login_user_id: loginParams.login_user_id,session_id:loginParams.session_id}}">
                        {{item.category_name}}
                    </router-link>
                </div>
            </div>
        </div>
        <div class="open-nav-btn" @click="changeShowAllCategory()">
            <span></span>
        </div>
        <div class="mask" v-show="showAllCategory">
            <div class="open-nav-content">
                <p class="title">全部分类</p>
                <div class="wrap">
                    <div class="btn" v-for="item in nav">
                        <router-link  active-class="on" v-on:click.native="changeShowAllCategory(true)"
                            :to="{ params: { category: item.category_id }, query: {login_user_id: loginParams.login_user_id,session_id:loginParams.session_id}}">
                            {{item.category_name}}
                        </router-link>
                    </div>
                </div>
                <div class="close-nav-btn" @click="changeShowAllCategory()"></div>
            </div>
            <div class="other-region" @click="changeShowAllCategory()"></div>
        </div>
        <pull-to
            :top-load-method="refresh" :top-block-height="0" @scroll="loadmore"
            :top-config="{doneText: ''}">
            <template slot="top-block" slot-scope="props">
                <div class="top-load-wrapper">
                    {{ props.stateText }}
                </div>
            </template>
            <div class="list" id="knacklist">
                <div class="item" v-for="item in list">
                    <router-link
                        :to="{  path: '/detail/'+item.id, query: {login_user_id: loginParams.login_user_id,session_id:loginParams.session_id}}">
                        <h2 class="title">{{item.title}}</h2>
                        <div class="text">
                            <p>{{item.summary}}</p>
                            <p>......</p>
                        </div>
                        <div class="bottom">
                            <div class="like-wrap unlike"><i></i><span>{{item.fav_count}}</span></div>
                            <span class="label">查看全文</span>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="bottom-load-wrapper" v-show="loading">加载中...</div>
            <div class="bottom-load-wrapper" v-show="loadDone">没有更多了</div>
        </pull-to>
    </div>
</template>

<script>
    import axios from 'axios'
    import PullTo from 'vue-pull-to'
    import proxy from '../common/proxy.js'

    export default {
        name: 'Knack',
        components: {
            PullTo
        },
        data () {
            return {
                showAllCategory: false,
                nav: [],
                list: [],
                loginParams: {},
                scrollFlag: true,
                start: 0,
                loadDone: false,
                loading: false,
                isIos: false
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.getData(this.$route.params.category);
                this.getLoginParams();
                this.getUa();
            })
        },
        // 路由更新钩子函数
        beforeRouteEnter (to, from, next) {
            next();
            setTimeout(function() {
                let scrollDis = sessionStorage.getItem('scrollDis');
                // 记录滚动位置 从详情返回时回到滚动位置
                if(scrollDis > 0) {
                    var oContainer = document.getElementsByClassName('scroll-container')[0];
                    oContainer.setAttribute("style", "-webkit-overflow-scrolling: auto");
                    oContainer.scrollTop = scrollDis;
                    oContainer.setAttribute("style", "-webkit-overflow-scrolling: touch");
                }
                // 从详情返回时，上方tab回到active的tab
                var activeDiv = document.getElementsByClassName('on')[0];
                var scrollDiv = document.getElementsByClassName('nav-wrap')[0];
                var clientWidth = document.body.clientWidth;
                var onOffsetLeft = activeDiv.offsetLeft;
                if(onOffsetLeft < clientWidth / 2) {
                        scrollDiv.scrollLeft = 0;
                }else {
                    scrollDiv.scrollLeft = onOffsetLeft/2 - 15;
                }
            }, 10);
        },
        beforeRouteUpdate (to, from, next) {
            next();
            this.list = [];
            this.start = 0;
            this.loadDone = false;
            this.loading = false;
            this.getData(this.$route.params.category);
        },
        methods: {
            getLoginParams () {
                this.loginParams = this.$route.query;
            },
            getData (category_id=0) {
                let that = this;
                let login_user_id = that.loginParams.login_user_id;
                let session_id = that.loginParams.session_id;
                let start = that.start;
                proxy.get('http://vilya.xiaoluluanzhuang.com/knack/list?category=1&category_id='+category_id+'&start='+start+'&login_user_id='+login_user_id+'&session_id='+session_id)
                .then((res) => {
                    console.log(res.data);
                    that.nav = res.data.category_list;
                    // 接口没有返回热门
                    that.nav.unshift({
                        category_id: 0,
                        category_name: '热门'
                    });
                    this.scrollToActive();
                    that.loading = false;
                    that.scrollFlag = false;
                    // 如果还有数据，则更新start
                    if(res.data.has_more) {
                        that.start = res.data.next_start_key;
                    }else {
                        that.loadDone = true;
                        return false;
                    }
                    that.list = that.list.concat(res.data.list);
                }).catch((err) => {
                    console.log(err);
                });
            },
            changeShowAllCategory (flag) {
                if(flag) {
                    this.scrollToActive();
                }
                this.showAllCategory = !this.showAllCategory;
            },
            refresh(loaded) {
                loaded('done');
                this.list = [];
                this.start = 0;
                this.getData(this.$route.params.category);
            },
            bottomLoad (loaded) {
                if(!this.loadDone) {
                    loaded('done');
                    this.getData(this.$route.params.category);
                }else {
                    loaded('fail');
                }
            },
            loadmore (e) {
                var dst = e.srcElement.scrollTop;
                var dch = e.srcElement.scrollHeight;
                var wsa = window.screen.availHeight;
                // 记录滑动条位置
                sessionStorage.setItem('scrollDis', dst);
                // 切换路由时 会导致小于0 而请求两次 这里设置大于0才触发
                if ((dch-wsa)-dst > 0 && (dch-wsa)-dst < 3000 && !this.scrollFlag) {
                    if(!this.loadDone) {
                        this.loading = true;
                        this.getData(this.$route.params.category);
                        this.scrollFlag = true;
                    }else {
                        // 没有了
                        console.log('没有更多了')
                    }
                }
            },
            fetchGet(url) {
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
            },
            proxy(url) {
                return this.fetchGet('http://139.199.79.226/proxy.php?url='+encodeURIComponent(url));
            },
            goHome() {
                window.location.href = 'xiaolu://close_webview';
            },
            scrollToActive() {
                // 因为路由跳转时会有一连串钩子函数操作，这里需要异步，等路由钩子操作完毕再执行。
                setTimeout(function() {
                    var activeDiv = document.getElementsByClassName('on')[0];
                    var scrollDiv = document.getElementsByClassName('nav-wrap')[0];
                    var clientWidth = document.body.clientWidth;
                    var onOffsetLeft = activeDiv.offsetLeft;
                    if(onOffsetLeft < clientWidth / 2) {
                         scrollDiv.scrollLeft = 0;
                    }else {
                        scrollDiv.scrollLeft = onOffsetLeft/2 - 15;
                    }
                    console.log(_vds);
                    _vds.track("chuzhao_more_page_show", { chuzhao_type: document.getElementsByClassName('on')[0].innerText});
                }, 100);
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
    .scroll-container {
        -webkit-overflow-scrolling:touch
    }
    .index.wrap {
        height: 100%;
    }
    .index {
        background-color: #fff;
        &.more20 {
            .header {
                padding-top: .4rem;
                i {
                    top: .66rem;
                }
            }
            .nav-wrap {
                top: 1.28rem;
            }
            .open-nav-btn {
                top: 1.27rem;
            }
            .nav-wrap:after {
                top: 2.05rem;
            }
            .list {
                padding-top: 2.08rem;
            }
            .open-nav-content {
                padding-top: .4rem;
            }
        }
        .top-load-wrapper,
        .bottom-load-wrapper {
            text-align: center;
            font-size: .24rem;
            color: #999;
        }
        .top-load-wrapper {
            line-height: 2.88rem;
        }
        .bottom-load-wrapper {
            height: .5rem;
        }
        .header {
            position: fixed;
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
            i {
                position: absolute;
                top: .26rem;
                left: .3rem;
                width: .22rem;
                height: .36rem;
                background-image: url(../assets/imgs/right-icon.png);
                background-size: 100%;
                background-repeat: no-repeat;
            }
        }
        .nav-wrap {
            position: fixed;
            top: .88rem;
            left: 0;
            width: 100%;
            height: 0.8rem;
            padding: .2rem .3rem .3rem;
            overflow-x: scroll;
            overflow-y: hidden;
            background-color: #fff;
            -webkit-overflow-scrolling: touch;
            box-sizing: border-box;
            z-index: 9;
            &::-webkit-scrollbar {
                display: none;
            }
            &:after {
                content: "";
                position: fixed;
                left: 0;
                right: 0;
                top: 1.65rem;
                height: 1px;
                background-color: #f3f3f3;
            }
            .nav-bar {
                min-width: 2000%;
                -webkit-overflow-scrolling: touch;
            }
            .category {
                float: left;
                margin-right: 0.5rem;
                color: #666;
                font-size: 0.3rem;
                text-align: center;
                &:last-child {
                    padding-right: 1rem;
                }
            }
            .category a {
                display: inline-block;
                padding: 0 .1rem .28rem;
                color: #666;
            }
            .category .on {
                position: relative;
                color: #ffa000;
                z-index: 10;
                &:after {
                    content: "";
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 1px;
                    border-bottom: 1px solid #ffa000;
                    box-sizing: border-box;
                    pointer-events: none;
                }
            }
        }
        .open-nav-btn {
            position: fixed;
            top: 0.86rem;
            right: 0;
            height: 0.79rem;
            padding: 0 0.3rem;
            background: linear-gradient(to right, rgba(255,255,255,.8), #fff 40%);
            z-index: 10;
            span {
                display: block;
                width: 0.26rem;
                height: 0.15rem;
                margin-top: 0.25rem;
                background-image: url(../assets/imgs/bottom-icon.png);
                background-size: 100%;
                background-repeat: no-repeat;
            }
        }
        .open-nav-content {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            padding: 0 0.3rem 0.4rem;
            z-index: 99;
            background-color: #fff;
            box-sizing: border-box;
            .wrap {
                display: flex;
                flex-wrap: wrap;
                background-color: #fff;
            }
            .title {
                height: .88rem;
                margin-bottom: .3rem;
                line-height: .88rem;
                text-align: center;
                font-size: .36rem;
                color: #303030;
            }
            .btn {
                margin-bottom: 0.3rem;
                margin-right: .2rem;
                &:nth-child(4n) {
                    margin-right: 0;
                }
            }
            a {
                display: inline-block;
                width: 1.56rem;
                height: .7rem;
                background-color: #f3f3f3;
                color: #303030;
                text-align: center;
                line-height: .7rem;
                font-size: .28rem;
                border-radius: .06rem;
                &.on {
                    color: #ffa000;
                }
            }
            .close-nav-btn {
                width: 0.26rem;
                height: 0.15rem;
                margin: .1rem auto 0;
                background-image: url(../assets/imgs/top-icon.png);
                background-size: 100%;
                background-repeat: no-repeat;
            }
        }

        .list {
            padding-top: 1.68rem;
            padding-bottom: .5rem;
            .item {
                position: relative;
                width: 6.9rem;
                margin: .5rem auto 0;
                padding: .7rem .4rem;
                border-radius: .2rem;
                box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, .1);
                box-sizing: border-box;
                .title {
                    margin-bottom: .8rem;
                    font-size: .44rem;
                    color: #303030;
                    line-height: 1.4;
                    font-weight: 600;
                }
                .text {
                    margin-bottom: 1.16rem;
                }
                p {
                    font-size: .34rem;
                    color: #303030;
                    line-height: .68rem;
                    &:first-child {
                        max-height: 3.4rem;
                        overflow: hidden;
                    }
                }
                .bottom {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: absolute;
                    bottom: .8rem;
                    left: .4rem;
                    right: .4rem;
                    color: #999;
                    font-size: .3rem;
                    line-height: 1;
                }
            }
            .like-wrap {
                display: flex;
                align-items: center;
                color: #999;
                font-size: .28rem;
                i {
                    width: .36rem;
                    height: .3rem;
                    margin-right: .2rem;
                    background-size: 100%;
                    background-repeat: no-repeat;
                }
            }
            .like i {
                background-image: url(../assets/imgs/like.png);
            }
            .unlike i {
                background-image: url(../assets/imgs/unlike.png);
            }
        }
        .mask {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, .3);
            z-index: 999;
            .other-region {
                width: 100%;
                height: 100%;
                z-index: 98;
            }
        }
    }
</style>
