import Vue from "vue";
import VueRouter from "vue-router";

// View components.
import Forecasts from "../views/Forecasts.vue";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    alias: "/home",
  },
  {
    path: "/forecasts",
    component: Forecasts,
    children: [
      {
        path: ":locality/current",
        name: "Current",
        component: () =>
          import(
            /* webpackChunkName: "current-forecast" */ "../components/forecasts/CurrentForecast.vue"
          ),
      },
      {
        path: ":locality/threedays",
        name: "Three Days",
        component: () =>
          import(
            /* webpackChunkName: "three-days-forecast" */ "../components/forecasts/ThreeDaysForecast.vue"
          ),
      },
      {
        path: "",
        name: "Forecasts",
        component: () =>
          import(
            /* webpackChunkName: "empty-forecast" */ "../components/forecasts/EmptyForecast.vue"
          ),
      },
    ],
  },
  {
    path: "/feedbacks",
    name: "Feedbacks",
    component: () =>
      import(/* webpackChunkName: "feedbacks" */ "../views/Feedbacks.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/User.vue"),
    children: [
      {
        // Login will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: "login",
        name: "Login",
        component: () => import("../views/users/Login.vue"),
      },
      {
        path: "register",
        component: () => import("../views/users/Register.vue"),
      },
      {
        path: "profile",
        component: () => import("../views/users/Profile.vue"),
      },
      {
        path: ":id",
        component: () => import("../views/users/PublicProfile.vue"),
      },
    ],
  },
  {
    path: "*",
    name: "Error 404",
    component: () =>
      import( "../views/Error404.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
