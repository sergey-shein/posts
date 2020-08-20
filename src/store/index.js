import Vue from "vue";
import Vuex from "vuex";
import posts from "./posts.js";

Vue.use(Vuex);

export default new Vuex.Store({
  getters: {
    ROLE(state) {
      return state.role;
    }
  },
  state: {
    role: null
  },
  mutations: {
    LOGIN(state, role) {
      state.role = role;
    },
    LOGOUT(state) {
      state.role = null;
    }
  },
  modules: {
    posts
  }
});
