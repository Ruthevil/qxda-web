<template>
    <div class="home">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
        <v-calendar is-double-paned></v-calendar>
    </div>
</template>

<script>
    import HelloWorld from '@/components/HelloWorld.vue'

    export default {
        name: 'home',
        data() {
            return {
                user: 'qxda-web-system',
                person: {
                    name: '李小思',
                    age: 18,
                    sex: '女',
                    idCard: '420156235896545126',
                    address: '广东省东莞市三叉街道56弄'
                }
            }
        },
        components: {
            HelloWorld
        },
        mounted() {
            console.log(process.env.VUE_APP_NAME)
            console.log(_)
        }
    }
</script>
<style lang="stylus">
    .home
        .card-template
            text-align start
            background-color antiquewhite !important
            display inline-block
</style>
