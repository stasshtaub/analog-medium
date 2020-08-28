<template>
  <div class="card post">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ title }}</p>
        </div>
      </div>
      <div class="content">{{ description }}</div>
      <footer class="post__footer card-footer pt-4">
        <p class="is-half has-text-grey-light">{{ timeAgo }} назад</p>
        <div class="buttons" v-if="isAuth">
          <b-button
            tag="router-link"
            :to="{ name: 'Edit', params: { id, post } }"
            class="button is-light mr-4"
            v-if="isAuthor"
          >
            <b-icon icon="square-edit-outline"></b-icon>
            <span class="ml-2">Изменить</span>
          </b-button>
          <b-button class="button is-light" v-if="isAuthor" @click="$emit('delete', id)">
            <b-icon icon="delete"></b-icon>
            <span class="ml-2">Удалить</span>
          </b-button>
          <b-button class="button is-primary" v-if="isReader" @click="clap" :loading="clapLoading">
            <b-icon icon="thumb-up"></b-icon>
            <span class="ml-2">{{ claps }}</span>
          </b-button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "../plugins/moment";
import alert from "../mixins/alert";

export default {
  name: "post",
  props: {
    id: { type: Number, default: null },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    claps: { type: Number, default: 0 },
    createdAt: { type: String, default: "" },
    updateAt: { type: String, default: "" },
    userId: { type: Number, default: null },
  },
  data: () => ({
    clapLoading: false,
  }),
  mixins: [alert],
  methods: {
    ...mapActions("post", ["updatePost"]),
    async clap() {
      this.clapLoading = true;
      try {
        const { id, claps } = this;
        await this.updatePost({ id, claps: claps + 1 });
        this.claps++;
      } catch (err) {
        this.alert("Не удалось хлопнуть", "is-danger");
      }
      this.clapLoading = false;
    },
  },
  computed: {
    ...mapGetters("user", ["user", "isAuth", "isReader"]),
    timeAgo() {
      return moment.duration(moment().diff(this.createdAt)).humanize();
    },
    isAuthor() {
      return this.userId == this.user.id;
    },
    post() {
      const { id, title, description, claps, createdAt, updateAt, user } = this;
      return { id, title, description, claps, createdAt, updateAt, user };
    },
  },
};
</script>

<style lang="scss">
.post {
  &__footer {
    justify-content: space-between;
  }
}
</style>
