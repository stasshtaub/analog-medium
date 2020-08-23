<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <section class="section">
      <h1 class="title has-text-centered has-text-dark">{{ title }}</h1>
      <ValidationProvider
        rules="required"
        name="Title"
        v-slot="{ errors, valid }"
      >
        <b-field
          label="Title"
          :type="{ 'is-danger': errors[0], 'is-success': valid }"
          :message="errors"
        >
          <b-input v-model="title" placeholder="Title"></b-input>
        </b-field>
      </ValidationProvider>

      <ValidationProvider
        rules="required"
        name="Description"
        v-slot="{ errors, valid }"
      >
        <b-field
          label="Description"
          :type="{ 'is-danger': errors[0], 'is-success': valid }"
          :message="errors"
        >
          <b-input v-model="description" placeholder="Description"></b-input>
        </b-field>
      </ValidationProvider>

      <div class="field is-grouped mt-4">
        <template v-if="$route.params.post">
          <div class="control">
            <b-button class="button" @click="exit">
              exit
            </b-button>
          </div>
          <div class="control">
            <b-button
              class="button is-primary"
              :loading="loading"
              @click="handleSubmit(save)"
            >
              Save
            </b-button>
          </div>
        </template>
        <div class="control" v-else>
          <b-button
            class="button is-primary"
            :loading="loading"
            @click="handleSubmit(create)"
          >
            Create
          </b-button>
        </div>
      </div>
    </section>
  </ValidationObserver>
</template>

<script>
export default {
  name: "post-form",
  props: {
    title: { tpe: String, default: "" },
  },
};
</script>
