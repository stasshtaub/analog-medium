<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <form class="section" @submit.prevent="handleSubmit(submit)">
      <h1 class="title has-text-centered has-text-dark">Login</h1>
      <ValidationProvider rules="required|email" name="login" v-slot="{ errors, valid }">
        <b-field
          label="E-Mail"
          :type="{ 'is-danger': errors[0], 'is-success': valid }"
          :message="errors"
        >
          <b-input v-model="login" type="email" placeholder="E-Mail"></b-input>
        </b-field>
      </ValidationProvider>

      <ValidationProvider
        rules="required"
        vid="password"
        name="Password"
        v-slot="{ errors, valid }"
      >
        <b-field
          label="Password"
          :type="{ 'is-danger': errors[0], 'is-success': valid }"
          :message="errors"
        >
          <b-input type="password" v-model="password" placeholder="Password" password-reveal></b-input>
        </b-field>
      </ValidationProvider>

      <b-button class="button is-primary mt-4" native-type="submit" :loading="loading">Login</b-button>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapActions } from "vuex";
import alert from "../mixins/alert";

export default {
  name: "login",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  mixins: [alert],
  data: () => ({
    login: "",
    password: "",
    loading: false,
  }),
  methods: {
    ...mapActions("user", ["signin"]),
    async submit() {
      this.loading = true;

      try {
        const { login, password } = this;
        await this.signin({ login, password });
        this.alert("Успешная авторизация!");
        this.$router.push("/");
      } catch (err) {
        let message = "";
        if (err.response) {
          switch (err.response.status) {
            case 401:
              message = "Неверный логин и/или пароль";
              break;
            default:
              message = `Что-то пошло не так. Код ошибки: ${err.response.status}`;
              break;
          }
        } else {
          message = "Что-то пошло не так";
        }

        this.alert(message, "is-danger");
      }

      this.loading = false;
    },
  },
};
</script>
