<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <section class="section">
      <h1 class="title has-text-centered has-text-dark">Login</h1>
      <ValidationProvider
        rules="required|email"
        name="Email"
        v-slot="{ errors, valid }"
      >
        <b-field
          label="E-Mail"
          :type="{ 'is-danger': errors[0], 'is-success': valid }"
          :message="errors"
        >
          <b-input v-model="email" type="email" placeholder="E-Mail"> </b-input>
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

      <button
        class="button is-primary"
        type="submit"
        @click="handleSubmit(login)"
      >
        Login
      </button>
    </section>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  name: "login",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    login() {
      console.log("login");
    },
  },
};
</script>
