import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import router from "./router";
// import socket from "./socket";
import store from "./state";
import vuetify from "./plugins/vuetify";

import VueCookies from "vue-cookies";
import VueGeolocation from "vue-browser-geolocation";
import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueCookies);
Vue.use(VueGeolocation);
Vue.use(VueSimpleAlert);

Vue.config.productionTip = false;

Vue.prototype.$http = axios;
// Vue.prototype.$socket = socket;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
