import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Forecasts from "../views/Forecasts.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/forecasts",
    component: Forecasts,
    name: "Forecasts",
    children: [
      {
        path: "",
        component: () => ({ template: "<div>Home</div>" }),
      },
      {
        path: "/:locality",
        component: () => ({
          template:
            "<div>By Locality {{ $route.params.locality }}</><router-view /> ",
        }),
        children: [
          {
            path: "/current",
            component: () => ({
              template: "<div>Current Weather</div>",
            }),
          },
          {
            path: "/threedays",
            component: () => ({
              template: "<div>Three Days Weather</div>",
            }),
          },
        ],
      },
    ],
  },
  {
    path: "/feedbacks",
    name: "Feedbacks",
    component: Home,
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
    component: Home, // TODO: Generate a proper 404 page.
  },
];

const router = new VueRouter({
  routes,
});

export default router;
