import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import router from "./router";
import store from "./state";
import vuetify from "./plugins/vuetify";
import VueGeolocation from 'vue-browser-geolocation';

Vue.use(VueGeolocation);
Vue.config.productionTip = false;

Vue.prototype.$http = axios;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
