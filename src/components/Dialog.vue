<template>
  <form>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete"></button>
      </header>
      <section class="modal-card-body">
        <p class="modal-card-text">{{ text }}</p>
      </section>
      <footer class="modal-card-foot">
        <div class="field is-grouped mt-4">
          <div class="control">
            <b-button class="button" @click="$emit('close')">
              {{ cancelText }}
            </b-button>
          </div>
          <div class="control">
            <b-button
              class="button is-primary"
              @click="confirm"
              :loading="loading"
            >
              {{ confirmText }}
            </b-button>
          </div>
        </div>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    title: { type: String, default: "" },
    text: { type: String, default: "" },
    cancelText: { type: String, default: "Отмена" },
    confirmText: { type: String, default: "Подтвердить" },
    onConfirm: { type: Function, default: () => {} },
  },
  data: () => ({
    loading: false,
  }),
  methods: {
    confirm() {
      this.loading = true;
      this.onConfirm().finally(() => {
        this.loading = false;
      });
    },
  },
};
</script>
