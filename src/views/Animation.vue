<template>
    <div id="container">
        <div class="title">CSS3序列图实现帧动画</div>
        <div class="animation">
            <div id="flashAnimation">背景颜色/字体颜色的切换</div>
            <div id="rotateAnimation">旋转动画</div>
        </div>
    </div>
</template>
<script>
import FlashAnimateUtil from "@/utils/FlashAnimateUtil";

export default {
    mounted() {
        //必须先给定动画容器的宽高
        new FlashAnimateUtil("#flashAnimation", 35, "background-color").appendAnimation();
    }
}
</script>
<style lang="stylus">
#container
    width 100%
    height 100%
    display flex
    flex-direction column
    .animation
        display flex
        justify-content space-around
        width 100%
        margin-top 20px
        #flashAnimation
            width: 500px;
            height: 500px;
            color: #ffffff;
        #rotateAnimation
            width 500px
            height 500px
            border: 5px solid red
            background-image url("~@/assets/timg.png")
            background-size: cover;
            border-radius: 50%;
            animation rotate 5s linear infinite
        @keyframes rotate {
            from {
                transform rotate(0deg)
            }
            to {
                transform rotate(360deg)
            }
        }
</style>
