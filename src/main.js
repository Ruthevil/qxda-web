import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import VCalendar from "v-calendar"
import Directive from "./Directive"
import EventHub from "./EventHub"

EventHub.install(Vue);

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VCalendar);

const mixin = {
    data() {
        return {}
    },
    created() {
        this.$eventHub.$register(this);
    },
    methods: {},
    directives: {
        ...Directive
    },
    beforeDestroy() {
        this.$eventHub.$offAll(this._uid);
    }
};
Vue.mixin(mixin);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
