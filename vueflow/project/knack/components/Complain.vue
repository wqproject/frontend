<template>
	<div id="report-dialog" class="report-dialog">
        <div class="report-container">
            <div class="thanks-bg"></div>
            <div class="close-btn" @click="closeFeedback()"></div>
            <div class="report-header">谢谢您的反馈</div>
            <div class="text-area">
                <textarea id="text-input" v-model.trim="feedback" placeholder="说说你不满意的原因吧~"></textarea>
            </div>
            <div class="btn-submit" @click="submit()" v-bind:class="{noclick: feedback.length === 0}">提交</div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import proxy from '../common/proxy.js'

    export default {
        props: ["loginParams"],
        data () {
            return {
                feedback: ''
            }
        },
        methods: {
            submit: function() {
                let that = this;
                let id = that.$route.params.id;
                let login_user_id = that.loginParams.login_user_id;
                let session_id = that.loginParams.session_id;
                if(that.feedback.length === 0) {
                    return false;
                }
                proxy.get('http://vilya.xiaoluluanzhuang.com/tool_mark/mark?refer_type=3&is_like=-1&refer_id='+id+'&login_user_id='+login_user_id+'&session_id='+session_id+'&feedback='+encodeURIComponent(that.feedback))
                .then((res) => {
                    console.log(res);
                    that.closeFeedback();
                    if(res.rtn === 0) {
                        window.location.href = 'xiaolu2.0://prompt_dialog_boxt/提交成功';
                    }else {
                        window.location.href = 'xiaolu2.0://prompt_dialog_boxt/提交失败';
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            closeFeedback: function() {
                this.feedback = '';
                this.$emit('close');
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @mixin one-px-border($color){
        content: '';
        position: absolute;
        top:0;
        left: 0;
        width: 200%;
        height: 200%;
        box-sizing: border-box;
        border: 1px solid $color;
        transform: scale(0.5);
        transform-origin: 0 0;
        pointer-events: none;
    }
    .report-dialog{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        font-size: .24rem;
        z-index: 999;
        background: rgba(0,0,0,0.5);
        position: fixed;
        .report-container{
            position: absolute;
            left: 50%;
            top:50%;
            transform: translate3D(-50%,-50%,0);
            width: 5.9rem;
            height: 5rem;
            border-radius: .26rem;
            background: #fff;
            .thanks-bg{
                position: absolute;
                left: 1.15rem;
                top: -1.3rem;
                width: 2.72rem;
                height: 1.49rem;
                background: url("//valar.huainanhai.com/h5/xiaolu/emotion_cyclopedia/img/dialog-bg.png") no-repeat;
                background-size:100% 100%;
            }
            .close-btn{
                position: absolute;
                right: 0;
                top: -.96rem;
                width: .65rem;
                height: .96rem;
                background: url("//valar.huainanhai.com/h5/xiaolu/emotion_cyclopedia/img/close_icon@2x.png") no-repeat;
                background-size:100% 100%;
            }
            .report-header{
                margin-top: .54rem;
                font-size: .34rem;
                font-weight: bold;
                text-align: center;
            }
            .text-area{
                position: relative;
                display: block;
                width: 4.9rem;
                height: 1.6rem;
                margin: .36rem auto;
                padding: .1rem;
                &:after{
                    @include one-px-border(#e4e4e4);
                    border-radius: 0.08rem;
                }
                >textarea{
                    width: 100%;
                    height: 100%;
                    resize: none;
                    border: none;
                    outline: none;
                    font-size: .26rem;
                    color: #303030;
                    &::-webkit-input-placeholder{
                        color: #cacaca;
                        font-size: .26rem;
                    }
                }
            }
            .btn-submit{
                margin: 0 auto;
                width: 5.1rem;
                height: .86rem;
                line-height: .86rem;
                text-align: center;
                color: #fff;
                background: #ffa000;
                font-size: .32rem;
                &.noclick{
                    background: #ccc;
                }
            }
        }
    }
</style>
