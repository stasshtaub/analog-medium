<template>
  <div class="feed">
    <posts-list />
  </div>
</template>

<script>
export default {
  name: "Feed",
  components: {
    PostsList: () => import("../components/PostsList"),
  },
};
</script>
