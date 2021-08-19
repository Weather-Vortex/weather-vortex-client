import Vue from "vue";
import Vuex from "vuex";

import { v4 as uuidv4 } from "uuid";

Vue.use(Vuex);

const state = {
  drawer: null,
  guid: null,
};

const getters = {
  drawerVisible: (state) => state.drawer,
  guid: (state) => state.guid,
};

const mutations = {
  assignGUID: (state) => (state.guid = uuidv4()),
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
