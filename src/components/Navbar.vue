<template>
  <b-navbar class="is-primary">
    <template slot="start">
      <b-navbar-item tag="div">
        <router-link class="button is-light" to="/">Feed</router-link>
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div" v-if="isWriter">
        <router-link class="button is-light" to="/create"
          >Create post</router-link
        >
      </b-navbar-item>
      <b-navbar-item tag="div" v-if="!isAuth">
        <router-link class="button is-light" to="/login">Login</router-link>
      </b-navbar-item>
      <b-navbar-item tag="div" v-else>
        <b-button class="button is-light" @click="logout">
          Logout
        </b-button>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "login",
  computed: {
    ...mapGetters("user", ["isAuth", "isWriter"]),
  },
  methods: {
    ...mapActions("user", ["logout"]),
  },
};
</script>

<style></style>
