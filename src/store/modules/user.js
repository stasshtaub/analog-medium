import axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    user: null,
  }),
  mutations: {
    setUser(state, user) {
      console.log("пришло в мутацию", user);
      state.user = user;
    },
    logout(state) {
      state.user = null;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://localhost:3000/users?login=${email}`)
          .then((resp) => {
            const user = resp.data[0];
            if (user && user.password == password) {
              commit("setUser", user);
              resolve();
            } else {
              reject();
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    logout({ commit }) {
      commit("logout");
    },
  },
  getters: {
    user: (s) => s.user,
    isAuth: (s) => !!s.user,
  },
};
