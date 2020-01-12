import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import components from 'bidding-pack-components'

Vue.config.productionTip = false
Vue.use(components);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
