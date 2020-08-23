import axios from "../../plugins/axios";

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
    updatePost(state, post) {
      const index = state.posts.findIndex((p) => p.id == post.id);
      state.posts[index] = { ...state.posts[index], ...post };
    },
    createPost(state, post) {
      state.posts.push(post);
    },
  },
  actions: {
    fetchPosts({ commit }, { page, limit }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/posts?_page=${page}&_limit=${limit}&_sort=id&_order=desc`)
          .then((resp) => {
            commit("setPosts", {
              posts: resp.data,
              total: resp.headers["x-total-count"],
            });
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    updatePost({ commit }, { id, title, description }) {
      const updateAt = new Date().toISOString();
      const data = { title, description, updateAt };
      return new Promise((resolve, reject) => {
        axios
          .patch(`/posts/${id}`, data)
          .then((resp) => {
            commit("updatePost", resp.data);
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    createPost({ commit }, { title, description }) {
      const createdAt = new Date().toISOString();
      const data = { title, description, createdAt, updateAt: createdAt };
      return new Promise((resolve, reject) => {
        axios
          .post(`/posts`, data)
          .then((resp) => {
            commit("createPost", { id: resp.data.id, ...data });
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  getters: {
    posts: (s) => s.posts,
    total: (s) => s.total,
  },
};
