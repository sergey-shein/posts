import axios from "axios";

export default {
  getters: {
    POSTS_PAGINATED(state) {
      const start = (state.current_page - 1) * 10;
      const end = start + 10;
      return state.posts.slice(start, end);
    },
    POSTS_COUNT(state) {
      return state.posts.length;
    },
    CURRENT_PAGE(state) {
      return state.current_page;
    }
  },

  state: {
    posts: [],
    current_page: 1
  },

  mutations: {
    fetch_posts(state, posts) {
      state.posts = posts;
    },

    delete_post(state, id) {
      state.posts.forEach((item, i) => {
        if (item.id == id) {
          state.posts.splice(i, 1);
        }
      });
    },

    claps_post(state, id) {
      state.posts.forEach((item, i) => {
        if (item.id == id) {
          state.posts[i].claps += 1;
        }
      });
    },

    CANGE_CURRENT_PAGE(state, payload) {
      state.current_page = payload;
    }
  },

  actions: {
    async FETCH_POSTS({ commit }) {
      const response = await axios.get("http://localhost:3000/posts?_sort=id&_order=desc");
      commit("fetch_posts", response.data);
    },

    async DELETE_POST({ commit }, id) {
      await axios.delete(`http://localhost:3000/posts/${id}`);
      commit("delete_post", id);
    },

    async CLAPS_POST({ commit }, post) {
      await axios.patch(`http://localhost:3000/posts/${post.id}`, { claps: +post.claps + 1 });
      commit("claps_post", post.id);
    }
  }
};
