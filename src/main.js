import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import router from "./router";
import socket from "./socket";
import store from "./state";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

Vue.prototype.$http = axios;
Vue.prototype.$socket = socket;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
