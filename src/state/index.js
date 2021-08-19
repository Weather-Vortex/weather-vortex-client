import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  drawer: null,
};

const getters = {
  drawerVisible: (state) => state.drawer,
};

const mutations = {
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
