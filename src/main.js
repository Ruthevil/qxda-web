import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import VCalendar from "v-calendar"


Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VCalendar);

Vue.directive("waterMarker", (el, bind) => {
    function addWaterMarker(text, parentNode, {width = 200, height = 200, font = 40, color = "rgba(180,180,180,0.2)", textAlign = "right"}) {
        let canvas = document.createElement("canvas");
        parentNode.appendChild(canvas);
        canvas.width = width;
        canvas.height = height;
        canvas.style.display = "none";
        let ctx = canvas.getContext("2d");
        ctx.rotate(-20 * Math.PI / 180);
        ctx.font = `${font}px 微软雅黑`;
        ctx.textBaseline = "middle";
        ctx.fillStyle = `${color}`;
        ctx.textAlign = `${textAlign}`;
        ctx.fillText(text, width / 2, height / 2);
        parentNode.style.backgroundImage = `url(${canvas.toDataURL("image/png")})`;
    }

    addWaterMarker(bind.value.text, el, {
        font: bind.value.font,
        color: bind.value.color
    })
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
