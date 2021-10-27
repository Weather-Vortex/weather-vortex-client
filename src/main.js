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
    /*
      Now we cannot get the auth cookie anymore since it is an httponly cookie. We should try a request to server each time to verify if the token is expired or not.
    */
    // Load authentication before the first isAuthentication request.
    const server = process.env.VUE_APP_SERVER_URL;
    const profileUrl = `${server}/auth/profile`;
    this.$http
      .get(profileUrl, { withCredentials: true })
      .then((response) => {
        if (response.data) {
          this.$store.commit("login", response.data);
        }
      })
      .catch((error) => {
        const title = "Application startup error";
        let errorMessage = "";
        switch (error.response.status) {
          case 401:
            /* 
              In this case, credentials are missing and we don't have to say
              anything to user, since it can be the first access to the
              application or after a recent logout.
            */
            break;
          case 403:
            errorMessage =
              "Your login session is expired, proceed with login again.";
            break;
          case 404:
            errorMessage = "No users found with given credentials.";
            break;
        }
        console.log(error.response);

        if (!errorMessage || errorMessage === "") {
          // User doesn't need to be alerted.
          return;
        }

        // Server didn't found the token in user storage.
        this.$alert(errorMessage, title, "error").then(() => {
          // Require the logout from the server, to expire auth httpOnly cookies
          const logoutUrl = `${server}/auth/logout`;
          this.$http.get(logoutUrl, { withCredentials: true }).then(() => {
            this.$alert("You are logged out").then(() => {
              // Execute the logout from the store and remove the cookie too.
              this.$cookies.remove("auth");
              this.$store.commit("logout");
              // Don't redirect the user to login anymore.
              // this.$router.push("/user/login");
              this.$router.push("/");
            });
          });
        });
      });
  },
}).$mount("#app");
