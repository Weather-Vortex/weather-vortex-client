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
  created: function() {
    // Load authentication before the first isAuthentication request.
    const auth = this.$cookies.get("auth");
    if(auth !== null) {
      const server = process.env.VUE_APP_SERVER_URL;
      let url = `${server}/api/profile`;
      this.$http
        .get(url, { withCredentials: true })
        .then((response) => {
          if (response.data) {
            this.$store.commit("login", response.data);
          }
        })
        .catch((error) => {
          switch (error.response.status) {
            case 400:
              this.$alert("Error!"); // or here
              break;
            case 401:
              this.$alert("Missing authentication info.").then(() =>
                this.$router.push("/user/login")
              );
              console.log(error.response);
              break;
          }
        });
    }
  }
}).$mount("#app");
