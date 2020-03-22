<template>
    <div id="container">
        CSS3序列图实现帧动画
    </div>
</template>
<script>
    import AnimateUtil from "../utils/AnimateUtil";

    export default {
        mounted() {
            //必须先给定动画容器的宽高
            new AnimateUtil("#container", 35, "background-color").appendAnimation();
        }
    }
</script>
<style lang="stylus">
    #container {
        width: 500px;
        height: 500px;
        margin: 50px auto;
        text-align: center;
        color: #ffffff;
    }
</style>