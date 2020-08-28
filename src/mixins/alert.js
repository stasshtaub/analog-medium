export default {
  methods: {
    alert(
      message,
      type = "is-success",
      onAction = () => {},
      position = "is-top-left",
      queue = false,
      duration = 2000
    ) {
      this.$buefy.snackbar.open({
        message,
        type,
        onAction,
        position,
        queue,
        duration,
      });
    },
  },
};
