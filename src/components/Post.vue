<template>
  <div class="card post">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ post.title }}</p>
        </div>
      </div>
      <div class="content">
        {{ post.description }}
      </div>
      <footer class="post__footer card-footer pt-4">
        <p class="is-half">{{ daysAgo }} дня назад</p>
        <div class="buttons">
          <button class="button is-light mr-4">
            <b-icon icon="square-edit-outline"> </b-icon>
            <span>Изменить</span>
          </button>
          <button class="button is-light">
            <b-icon icon="delete"> </b-icon>
            <span>Удалить</span>
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "post",
  props: {
    post: { type: Object, default: () => ({}) },
  },
  computed: {
    daysAgo() {
      return 2;
    },
  },
};
</script>

<style lang="scss">
.post {
  &__footer {
    justify-content: space-between;
  }
}
</style>
