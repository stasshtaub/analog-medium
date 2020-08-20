<template>
  <div class="feed">
    <posts-list v-if="posts.length" :posts="posts" />
    <p v-else-if="!loading">Постов нет</p>
    <pagination
      v-if="total > 10"
      :total="total"
      :currentInit="page"
      @change="pageChange"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Feed",
  components: {
    PostsList: () => import("../components/PostsList"),
    Pagination: () => import("../components/Pagination"),
  },
  data: () => ({
    page: 1,
    limit: 10,
    loading: true,
  }),
  methods: {
    ...mapActions("post", ["fetchPosts"]),
    pageChange(number) {
      this.page = number;
      this.fetch();
    },
    async fetch() {
      this.loading = true;
      const { page, limit } = this;
      await this.fetchPosts({ page, limit });
      this.loading = false;
    },
  },
  computed: {
    ...mapGetters("post", ["posts", "total"]),
  },
  mounted() {
    this.fetch();
  },
};
</script>
