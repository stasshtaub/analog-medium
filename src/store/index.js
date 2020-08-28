import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import post from "./modules/post";
import user from "./modules/user";

export default new Vuex.Store({
  modules: {
    post,
    user,
  },
  state: {
    error: null,
  },
  mutations: {
    setError: (state, error) => {
      state.error = error;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});
