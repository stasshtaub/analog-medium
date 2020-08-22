<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <section class="section">
      <h1 class="title has-text-centered has-text-dark">
        {{ post ? "Редактирование" : "Создание" }} поста
      </h1>
      <ValidationProvider
        rules="required"
        name="Title"
        v-slot="{ errors, valid }"
      >
        <b-field
          label="Title"
          :type="{ 'is-danger': errors[0], 'is-success': valid }"
          :message="errors"
        >
          <b-input v-model="title" placeholder="Title"></b-input>
        </b-field>
      </ValidationProvider>

      <ValidationProvider
        rules="required"
        name="Description"
        v-slot="{ errors, valid }"
      >
        <b-field
          label="Description"
          :type="{ 'is-danger': errors[0], 'is-success': valid }"
          :message="errors"
        >
          <b-input v-model="description" placeholder="Description"></b-input>
        </b-field>
      </ValidationProvider>

      <div class="field is-grouped mt-4">
        <template v-if="post">
          <div class="control">
            <b-button class="button" @click="cancel">
              Cancel
            </b-button>
          </div>
          <div class="control">
            <b-button
              class="button is-primary"
              :loading="loading"
              @click="handleSubmit(save)"
            >
              Save
            </b-button>
          </div>
        </template>
        <div class="control" v-else>
          <b-button
            class="button is-primary"
            :loading="loading"
            @click="handleSubmit(create)"
          >
            Create
          </b-button>
        </div>
      </div>
    </section>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapActions } from "vuex";
import Axios from "axios";

export default {
  name: "post-management",
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  data: () => ({
    loading: false,
    title: "",
    description: "",
    post: null,
  }),
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  methods: {
    ...mapActions("post", ["updatePost", "createPost", "fetchPost"]),
    save() {
      this.loading = true;
      const { title, description } = this;
      this.updatePost({ id: this.post.id, title, description })
        .then(() => {
          this.$buefy.snackbar.open({
            message: "Пост успешно изменён!",
            position: "is-top-left",
            duration: 2000,
          });
          this.$router.push("/");
        })
        .catch((err) => {
          let message = "Что-то пошло не так";
          if (err.response) {
            message += `. Код ошибки: ${err.response.status}`;
          }
          this.$buefy.snackbar.open({
            message,
            position: "is-top-left",
            type: "is-danger",
            duration: 2000,
            queue: false,
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    create() {
      this.loading = true;
      const { title, description } = this;
      this.createPost({ title, description })
        .then(() => {
          this.$buefy.snackbar.open({
            message: "Пост создан!",
            position: "is-top-left",
            duration: 2000,
          });
          this.$router.push("/");
        })
        .catch((err) => {
          let message = "Что-то пошло не так";
          if (err.response) {
            message += `. Код ошибки: ${err.response.status}`;
          }
          this.$buefy.snackbar.open({
            message,
            position: "is-top-left",
            type: "is-danger",
            duration: 2000,
            queue: false,
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    cancel() {
      this.$router.push("/");
      //   this.$destroy();
    },
  },
  async created() {
    if (this.id) {
      await Axios.get(`http://localhost:3000/posts/${this.id}`).then((resp) => {
        this.post = resp.data;
        const { title, description } = this.post;
        this.title = title;
        this.description = description;
      });
    }
  },
};
</script>

<style></style>
