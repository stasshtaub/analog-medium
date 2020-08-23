<template>
  <div class="card post">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ post.title }}</p>
        </div>
      </div>
      <div class="content">
        {{ post.description }}
      </div>
      <footer class="post__footer card-footer pt-4">
        <p class="is-half has-text-grey-light">{{ timeAgo }} назад</p>
        <div class="buttons" v-if="isAuth">
          <b-button
            tag="router-link"
            :to="{ name: 'Edit', params: { id: post.id, post } }"
            class="button is-light mr-4"
            v-if="isAuthor"
          >
            <b-icon icon="square-edit-outline"> </b-icon>
            <span class="ml-2">Изменить</span>
          </b-button>
          <button class="button is-light" v-if="isAuthor">
            <b-icon icon="delete"> </b-icon>
            <span class="ml-2">Удалить</span>
          </button>
          <b-button
            class="button is-primary"
            v-if="isReader"
            @click="clap"
            :loading="clapLoading"
          >
            <b-icon icon="thumb-up"> </b-icon>
            <span class="ml-2">{{ post.claps }}</span>
          </b-button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "../plugins/moment";

export default {
  name: "post",
  props: {
    post: { type: Object, default: () => ({}) }, // {id: <Number>, title: <String>, description: <String>, claps: <Number>, createdAt: <String>, updateAt: <String>, userId: <Number>}
  },
  data: () => ({
    clapLoading: false,
  }),
  methods: {
    ...mapActions("post", ["updatePost"]),
    clap() {
      this.clapLoading = true;
      const { id, claps } = this.post;
      this.updatePost({ id, claps: claps + 1 })
        .then(() => {
          this.post.claps++;
        })
        .finally(() => {
          this.clapLoading = false;
        });
    },
  },
  computed: {
    ...mapGetters("user", ["user", "isAuth", "isReader"]),
    timeAgo() {
      return moment.duration(moment().diff(this.post.createdAt)).humanize();
    },
    isAuthor() {
      return this.post.userId == this.user.id;
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.post {
  &__footer {
    justify-content: space-between;
  }
}
</style>
