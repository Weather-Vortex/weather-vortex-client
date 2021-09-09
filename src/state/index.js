import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  drawer: null,
  // The value of user changes before the first request by loadAuthentication mutation.
  user: null,
};

const getters = {
  drawerVisible: (state) => state.drawer,
  initials: (state) => {
    if (state.user === null) {
      return "";
    }

    const firstName = state.user.firstName.charAt(0);
    const lastName = state.user.lastName.charAt(0);
    return `${firstName}${lastName}`;
  },
  getId: (state) => {
    if (state.user === null) {
      return "";
    }
    const id = state.user.id;
    return `${id}`;
  },
  isAuthenticated: (state) => {
    return state.user !== null;
  },
};

const mutations = {
  login: (state, value) => {
    state.user = value;
    console.log("LOGIN MUTATION: ", value);
  },
  logout: (state) => (state.user = null),
  setDrawerVisibility: (state, value) => (state.drawer = value),
  toggleDrawer: (state) => (state.drawer = !state.drawer),
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  /*
  In strict mode, whenever Vuex state is mutated outside of mutation handlers, an error will be thrown.
  From doc: https://vuex.vuejs.org/guide/strict.html#strict-mode.
  */
  strict: process.env.NODE_ENV !== "production",
});

export default store;
