<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <form class="section" @submit.prevent="handleSubmit(save)">
      <h1
        class="title has-text-centered has-text-dark"
      >{{ $route.params.post ? "Редактирование" : "Создание" }} поста</h1>
      <ValidationProvider rules="required" name="Title" v-slot="{ errors, valid }">
        <b-field
          label="Title"
          :type="{ 'is-danger': errors[0], 'is-success': valid }"
          :message="errors"
        >
          <b-input v-model="editedPost.title" placeholder="Title"></b-input>
        </b-field>
      </ValidationProvider>

      <ValidationProvider rules="required" name="Description" v-slot="{ errors, valid }">
        <b-field
          label="Description"
          :type="{ 'is-danger': errors[0], 'is-success': valid }"
          :message="errors"
        >
          <b-input v-model="editedPost.description" type="textarea" placeholder="Description"></b-input>
        </b-field>
      </ValidationProvider>

      <div class="field is-grouped mt-4">
        <div class="control">
          <b-button class="button" @click="exit">Cancel</b-button>
        </div>
        <div class="control">
          <b-button class="button is-primary" :loading="loading" native-type="submit">Save</b-button>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapActions, mapGetters } from "vuex";
import alert from "../mixins/alert";
import axios from "../plugins/axios";

export default {
  name: "post-management",
  props: {
    id: {
      type: Number,
      default: null,
    },
    post: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    editedPost: {},
    loading: false,
    postLoading: true,
  }),
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  mixins: [alert],
  computed: {
    ...mapGetters("user", ["user"]),
  },
  methods: {
    ...mapActions("post", ["updatePost"]),
    async save() {
      this.loading = true;

      try {
        await this.updatePost(this.editedPost);
        this.alert("Пост успешно изменён!");
        this.exit();
      } catch (err) {
        let message = "Не удалось изменить пост";
        if (err.response) {
          message += `. Код ошибки: ${err.response.status}`;
        }
        this.alert(message, "is-danger");
      }

      this.loading = false;
    },
    exit() {
      this.$router.push("/");
    },
  },
  async created() {
    try {
      this.editedPost =
        this.post || (await axios.get(`/posts/${this.id}`)).data;
      if (this.editedPost.userId == this.user.id) {
        this.postLoading = false;
      } else {
        this.exit();
      }
    } catch (err) {
      let message = "Не удалось загрузить пост";
      if (err.response) {
        message += `. Код ошибки: ${err.response.status}`;
      }
      this.alert(message, "is-danger");
    }
  },
};
</script>
