<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <form class="section" @submit.prevent="handleSubmit(create)">
      <h1 class="title has-text-centered has-text-dark">
        Создание поста
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
          <b-input
            v-model="description"
            type="textarea"
            placeholder="Description"
          ></b-input>
        </b-field>
      </ValidationProvider>

      <div class="field is-grouped mt-4">
        <div class="control">
          <b-button
            class="button is-primary"
            :loading="loading"
            native-type="submit"
          >
            Create
          </b-button>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapActions } from "vuex";
import alert from "../mixins/alert";

export default {
  name: "Create",
  data: () => ({
    loading: false,
    title: "",
    description: "",
  }),
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  mixins: [alert],
  methods: {
    ...mapActions("post", ["createPost"]),
    create() {
      this.loading = true;
      const { title, description } = this;
      this.createPost({ title, description })
        .then(() => {
          this.alert("Пост создан!");
          this.exit();
        })
        .catch((err) => {
          let message = "Что-то пошло не так";
          if (err.response) {
            message += `. Код ошибки: ${err.response.status}`;
          }
          this.alert(message, "is-danger");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    exit() {
      this.$router.push("/");
    },
  },
};
</script>
