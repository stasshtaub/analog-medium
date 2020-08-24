<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <form class="section" @submit.prevent="handleSubmit(submit)">
      <h1 class="title has-text-centered has-text-dark">Login</h1>
      <ValidationProvider
        rules="required|email"
        name="login"
        v-slot="{ errors, valid }"
      >
        <b-field
          label="E-Mail"
          :type="{ 'is-danger': errors[0], 'is-success': valid }"
          :message="errors"
        >
          <b-input v-model="login" type="email" placeholder="E-Mail"> </b-input>
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
          <b-input
            type="password"
            v-model="password"
            placeholder="Password"
            password-reveal
          ></b-input>
        </b-field>
      </ValidationProvider>

      <b-button class="button is-primary mt-4" native-type="submit" :loading="loading">
        Login
      </b-button>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapActions } from "vuex";

export default {
  name: "login",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data: () => ({
    login: "",
    password: "",
    loading: false,
  }),
  methods: {
    ...mapActions("user", ["signin"]),
    submit() {
      this.loading = true;
      const { login, password } = this;
      this.signin({ login, password })
        .then(() => {
          this.$buefy.snackbar.open({
            message: "Успешная авторизация!",
            position: "is-top-left",
            duration: 2000,
          });
          this.$router.push("/");
        })
        .catch((err) => {
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
  },
};
</script>
