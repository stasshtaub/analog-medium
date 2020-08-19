<template>
  <div class="posts-list">
    <ul v-if="posts.length">
      <li v-for="post in posts" :key="post.id">
        <post :post="post" />
      </li>
    </ul>
    <p v-else>Постов нет</p>
  </div>
</template>

<script>
export default {
  name: "posts-list",
  components: {
    post: () => import("./Post"),
  },
  data: () => ({
    posts: [
      {
        id: 1,
        title: "Название поста",
        description: "Текст",
        claps: 0,
        createdAt: "2019-09-29T00:00:00.000Z",
        updateAt: "2019-09-29T00:00:00.000Z",
        userId: 1,
      },
    ],
  }),
};
</script>

<style></style>
