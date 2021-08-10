import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/forecasts/:locality",
    name: "Forecasts",
    component: Home,
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
    path: "*",
    name: "Error 404",
    component: Home, // TODO: Generate a proper 404 page.
  },
];

const router = new VueRouter({
  routes,
});

export default router;
