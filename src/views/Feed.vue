<template>
  <div class="feed">
    <posts-list v-if="posts.length" :posts="posts" />
    <b-loading :is-full-page="false" v-model="loading"></b-loading>
    <div class="box" v-if="!loading && !posts.length">
      <p class="content has-text-centered">Постов нет</p>
    </div>
    <pagination v-if="total > 10" :total="total" :currentInit="page" @change="pageChange" />
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
      try {
        const { page, limit } = this;
        await this.fetchPosts({ page, limit });
      } catch (err) {
        let message = "Не удалось загрузить посты";
        if (err.response) {
          message += `. Код ошибки: ${err.response.status}`;
        }
        this.alert(message, "is-danger");
      }
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

<style>
.feed {
  min-height: 100px;
}
</style>
