import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/index.js'
import moment from 'moment'
import "@egjs/vue-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";

moment.locale('de');
Vue.prototype.moment = moment;
Vue.config.productionTip = false

new Vue({
  vuetify,
  router: router,
  render: h => h(App)
}).$mount('#app')
