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
  },
  {
    path: "/forecasts/:locality",
    name: "Forecasts",
    component: Forecasts,
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
        meta: {
          guest: true //TODO da mettere una volta fato il logout
        }
      },
      {
        path: "register",
        component: () => import("../views/users/Register.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "profile",
        component: () => import("../views/users/Profile.vue"),
        meta: {
          requiresAuth: true,
        }
      },
      {

        path: "logout",
        component: () => import("../views/users/Logout.vue"),
        meta: {
          requiresAuth: true,
        }
      },
      {
        path: "public",
        children: [
          {
            path: ":id",
            component: () => import("../views/users/PublicProfile.vue"),
          }
        ],

      },

      {
        path: "/confirm/:confirmationCode",
        component: () => import("../views/users/Welcome.vue"),
      },
    ],
  },
  {
    path: "*",
    name: "Error 404",
    component: () =>
      import("../views/Error404.vue"),
  },
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {

      next()

    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next()
    }
    else {
      next({ name: 'profile' })
    }
  } else {
    next()
  }
})



export default router;
