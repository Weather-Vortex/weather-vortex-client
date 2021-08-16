<template>
  <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
    elevation="2"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-card-title>
      <div>
        <div v-if="loading">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
        <div v-else-if="status === true">
          <!-- Server status {{ status }} -->
          <v-icon color="green" x-large left>mdi-check-circle</v-icon>
        </div>
        <div v-else-if="status === false">
          <v-icon color="red" x-large left>mdi-close-circle</v-icon>
        </div>
      </div>
      <span class="text-h6 font-weight-light"
        >&nbsp;{{ this.name }} Status:&nbsp;</span
      >
    </v-card-title>
    <v-card-text>
      <div>Fetching for service info {{ this.url }}.</div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text @click="checkStatus">
        <v-icon>mdi-refresh</v-icon>
        Retry</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "CheckStatus",
  data() {
    return {
      loading: false,
      status: null,
    };
  },
  props: {
    name: String,
    url: String,
  },
  methods: {
    async checkStatus() {
      this.loading = true;
      try {
        console.log(this.url);
        const { data } = await this.$http.get(this.url);
        console.log(data);
        this.status = data.result === "ok";
      } catch (error) {
        this.status = false;
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.checkStatus();
  },
};
</script>
