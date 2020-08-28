<template>
  <div class="posts-list">
    <ul>
      <li v-for="post in posts" :key="post.id">
        <post class="mb-4" v-bind="post" @delete="onDeleteCLick" />
      </li>
    </ul>
    <b-modal
      v-model="isModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
    >
      <template #default="props">
        <delete-dialog v-bind="modalProps" @close="props.close"></delete-dialog>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import alert from "../mixins/alert";

export default {
  name: "posts-list",
  components: {
    post: () => import("./Post"),
    deleteDialog: () => import("../components/Dialog"),
  },
  data: () => ({
    isModalActive: false,
    modalProps: {
      title: "Удаление поста",
      text: "Вы действительно хотите удалить этот пост?",
      confirmText: "Удалить",
    },
  }),
  mixins: [alert],
  methods: {
    ...mapActions("post", ["deletePost"]),
    onDeleteCLick(id) {
      this.isModalActive = true;
      this.modalProps.onConfirm = async () => {
        await this.delete(id);
      };
    },
    async delete(id) {
      try {
        await this.deletePost(id);
        this.alert("Пост успешно удалён");
        this.isModalActive = false;
      } catch (err) {
        this.alert("Не удалось удалить пост", "is-danger");
      }
    },
  },
  props: {
    posts: { type: Array, default: () => [] },
  },
};
</script>
