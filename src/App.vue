<template>
  <div id="app">
    <navbar />
    <div class="container pt-5">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Navbar,
  },
  methods: {
    ...mapActions("user", ["signin", "logout"]),
  },
  computed: {
    ...mapGetters("user", ["isAuth", "token"]),
  },
  created() {
    if (this.isAuth) {
      const { login, password } = this.token;
      this.signin({ login, password }).catch(() => {
        this.logout();
      });
    }
  },
};
</script>
