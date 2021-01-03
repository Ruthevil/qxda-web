import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import TestUploadExcel from "@/views/TestUploadExcel.vue"
import TestUploadImg from "@/views/TestUploadImg.vue"
import TestElDialog from "@/views/TestElDialog.vue"
import TestWaterMarker from "@/views/TestWaterMarker.vue"
import TestEchartsTree from "@/views/TestEchartsTree.vue"
import TestG6 from "@/views/TestG6.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/animation',
        name: 'animation',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/Animation.vue')
    },
    {
        path: "/upload",
        name: "upload",
        component: TestUploadExcel
    },
    {
        path: "/img",
        name: "img",
        component: TestUploadImg
    },
    {
        path: "/dialog",
        name: "dialog",
        component: TestElDialog
    },
    {
        path: "/waterMarker",
        name: "waterMarker",
        component: TestWaterMarker
    },
    {
        path: "/echartsTree",
        name: "echartsTree",
        component: TestEchartsTree
    },
    {
        path: "/g6",
        name: "g6",
        component: TestG6
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
