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
        path: "login",
        name: "Login",
        component: () => import("../views/users/Login.vue"),
        meta: {
          guest: true, //TODO da mettere una volta fato il logout
        },
      },
      {
        path: "register",
        component: () => import("../views/users/Register.vue"),
        meta: {
          guest: true,
        },
      },
      {
        name: "Personal Profile",
        path: "profile",
        component: () => import("../views/users/Profile.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "logout",
        component: () => import("../views/users/Logout.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "public",
        children: [
          {
            path: ":id",
            component: () => import("../views/users/PublicProfile.vue"),
          },
        ],
      },
      {
        path: "confirm",
        /*props: route => ({ query: route.query }),*/
        component: () => import("../views/users/Welcome.vue"),
        // props: true,
      },
    ],
  },
  {
    path: "*",
    name: "Error 404",
    component: () => import("../views/Error404.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const cookies = document.cookie.split("; ");
  const auth = cookies.find((row) => row.startsWith("auth="));
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (auth === undefined) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (auth === undefined) {
      next();
    } else {
      next({ name: "Personal Profile" });
    }
  } else {
    next();
  }
});

export default router;
