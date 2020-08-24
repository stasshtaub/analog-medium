import axios from "../../plugins/axios";

export default {
  namespaced: true,
  state: () => ({
    // для прототипа авторизации вместо настоящего токена - логин и пароль
    token:
      localStorage.getItem("login") && localStorage.getItem("password")
        ? {
            login: localStorage.getItem("login"),
            password: localStorage.getItem("password"),
          }
        : null,
    user: null,
  }),
  mutations: {
    setUser(state, user) {
      const { login, password } = user;
      localStorage.setItem("login", login);
      localStorage.setItem("password", password);
      state.token = { login, password };
      state.user = user;
    },
    logout(state) {
      localStorage.removeItem("login");
      localStorage.removeItem("password");
      state.token = null;
      state.user = null;
    },
  },
  actions: {
    async signin({ commit }, { login, password }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/users?login=${login}`)
          .then((resp) => {
            const user = resp.data[0];
            if (user && user.password == password) {
              commit("setUser", user);
              resolve();
            } else {
              const err = {
                response: {
                  status: 401,
                },
              };
              reject(err);
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
    token: (s) => s.token,
    user: (s) => s.user,
    isAuth: (s) => !!s.token,
    isWriter: (s) => !!s.user && s.user.role === "writer",
    isReader: (s) => !!s.user && s.user.role === "reader",
  },
};
