<template>
  <section class="section">
    <h1 class="title has-text-centered has-text-dark">Login</h1>
    <form @submit.prevent="login">
      <b-field label="E-Mail">
        <b-input v-model="email" type="email" placeholder="E-Mail"> </b-input>
      </b-field>

      <b-field label="Password">
        <b-input
          type="password"
          v-model="password"
          placeholder="Password"
          password-reveal
        >
        </b-input>
      </b-field>

      <button class="button is-primary" type="submit">
        Login
      </button>
    </form>
  </section>
</template>

<script>
export default {
  name: "login",
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
