<template>
  <b-navbar class="is-primary">
    <template slot="end">
      <b-navbar-item tag="div">
        <router-link class="button is-light" to="/login">Login</router-link>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "login",
};
</script>

<style></style>
