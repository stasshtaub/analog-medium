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
      const index = state.posts.findIndex(({ id }) => id == post.id);
      state.posts[index] = { ...state.posts[index], ...post };
    },
    createPost(state, post) {
      state.posts.push(post);
      state.total++;
    },
    deletePost(state, postId) {
      state.posts = state.posts.filter(({ id }) => id !== postId);
      state.total--;
    },
  },
  actions: {
    async fetchPosts({ commit }, { page, limit }) {
      try {
        const params = { page, limit, _sort: "id", _order: "desc" };
        const { data, headers } = await axios.get("/posts", { params });
        commit("setPosts", {
          posts: data,
          total: headers["x-total-count"],
        });
      } catch (error) {
        commit("setError", error, { root: true });
        throw error;
      }
    },
    async updatePost({ commit }, post) {
      try {
        const updateAt = new Date().toISOString();
        const { data } = await axios.patch(`/posts/${post.id}`, {
          ...post,
          updateAt,
        });
        commit("updatePost", data);
      } catch (error) {
        commit("setError", error, { root: true });
        throw error;
      }
    },
    async createPost({ commit, rootState }, { title, description }) {
      try {
        const createdAt = new Date().toISOString();
        const post = {
          claps: 0,
          title,
          description,
          createdAt,
          updateAt: createdAt,
          userId: rootState.user.user.id,
        };
        const { data } = await axios.post("/posts", post);
        commit("createPost", data);
      } catch (error) {
        commit("setError", error, { root: true });
        throw error;
      }
    },
    async deletePost({ commit }, id) {
      try {
        await axios.delete(`/posts/${id}`);
        commit("deletePost", id);
      } catch (error) {
        commit("setError", error, { root: true });
        throw error;
      }
    },
  },
  getters: {
    posts: (s) => s.posts,
    total: (s) => s.total,
  },
};
