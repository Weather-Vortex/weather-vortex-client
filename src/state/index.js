import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  drawer: null,
  user: null
};

const getters = {
  drawerVisible: (state) => state.drawer,
  initials: (state) => {
    //if(this.isAuthenticated(state)) {
      const firstName = state.user.firstName.charAt(0);
      const lastName = state.user.lastName.charAt(0);
      return `${firstName}${lastName}`
    // } else {
    //   return ""
    // }
  },
  isAuthenticated: (state) => state.user !== null
};

const mutations = {
  login: (state, value) => {
    state.user = value;
    console.log("LOGIN MUTATION: ", value);
  },
  logout: (state) => state.user = null,
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
