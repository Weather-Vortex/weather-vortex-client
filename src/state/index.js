import Vue from "vue";
import Vuex from "vuex";

import localStore from "store";

Vue.use(Vuex);

const state = {
  drawer: null,
  // The value of user changes before the first request by loadAuthentication mutation.
  user: null,
};

const getters = {
  drawerVisible: (state) => state.drawer,
  initials: (state) => {
    if (!state.user) {
      return "";
    }

    const firstName = state.user.firstName.charAt(0);
    const lastName = state.user.lastName.charAt(0);
    return `${firstName}${lastName}`;
  },
  getId: (state) => {
    if (!state.user) {
      return "";
    }
    const id = state.user.id;
    return `${id}`;
  },
  isAuthenticated: (state) => {
    if (process.env.NODE_ENV !== "production") {
      console.log("Is Auth:", state.user);
    }

    if (!state.user) {
      // Try to retrieve data from local storage.
      const user = localStore.get("user_data");
      if (user) {
        store.commit("login", user);
        return true;
      }

      return false;
    }

    return true;
  },
};

const mutations = {
  login: (state, value) => {
    state.user = value;
    localStore.set("user_data", value);
    if (process.env.NODE_ENV !== "production") {
      console.log("LOGIN MUTATION: ", value);
    }
  },
  logout: (state) => {
    state.user = null;
    localStore.remove("user_data");
  },
  setDrawerVisibility: (state, value) => (state.drawer = value),
  toggleDrawer: (state) => (state.drawer = !state.drawer),
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions: {
    loadStore: function(store) {
      const user = localStore.get("user_data");
      store.commit("login", user);
    },
  },
  /*
  In strict mode, whenever Vuex state is mutated outside of mutation handlers, an error will be thrown.
  From doc: https://vuex.vuejs.org/guide/strict.html#strict-mode.
  */
  strict: process.env.NODE_ENV !== "production",
});

export default store;
