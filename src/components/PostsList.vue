<template>
  <div class="posts-list">
    <ul>
      <li v-for="post in posts" :key="post.id">
        <post class="mb-4" :post="post" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "posts-list",
  components: {
    post: () => import("./Post"),
  },
  props: {
    posts: { type: Array, default: () => [] },
  },
};
</script>
