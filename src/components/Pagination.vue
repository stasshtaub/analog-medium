<template>
  <b-pagination
    :total="total"
    v-model="current"
    :range-before="rangeBefore"
    :range-after="rangeAfter"
    :order="order"
    :size="size"
    :simple="isSimple"
    :rounded="isRounded"
    :per-page="perPage"
    :icon-prev="prevIcon"
    :icon-next="nextIcon"
    aria-next-label="Next page"
    aria-previous-label="Previous page"
    aria-page-label="Page"
    aria-current-label="Current page"
    @change="change"
  >
  </b-pagination>
</template>

<script>
export default {
  name: "pagination",
  props: {
    total: { type: Number, default: 0 },
    currentInit: { type: Number, default: 1 },
    perPage: { type: Number, default: 10 },
  },
  data: () => ({
    current: 1,
    rangeBefore: 3,
    rangeAfter: 1,
    order: "is-centered",
    size: "",
    isSimple: false,
    isRounded: false,
    prevIcon: "chevron-left",
    nextIcon: "chevron-right",
  }),
  computed: {},
  methods: {
    change(number) {
      this.$emit("change", number);
    },
  },
  mounted() {
    this.current = this.currentInit;
  },
};
</script>

<style></style>
