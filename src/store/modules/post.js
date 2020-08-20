import axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    posts: [],
    total: 0,
  }),
  mutations: {
    setPosts(state, { posts, total }) {
      state.posts = posts;
      if (state.total == 0) {
        state.total = +total;
      }
    },
  },
  actions: {
    fetchPosts({ commit }, { page, limit }) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `http://localhost:3000/posts?_page=${page}&_limit=${limit}&_sort=id&_order=desc`
          )
          .then((resp) => {
            commit("setPosts", {
              posts: resp.data,
              total: resp.headers["x-total-count"],
            });
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    fetchPost() {},
  },
  getters: {
    posts: (s) => s.posts,
    total: (s) => s.total,
  },
};
