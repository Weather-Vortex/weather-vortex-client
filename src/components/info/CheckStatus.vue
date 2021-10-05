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
      <span class="text-h6 font-weight-light">
        &nbsp;{{ this.name }} Status:&nbsp;
      </span>
    </v-card-title>
    <v-card-text>
      <div v-if="loading">Fetching for service info {{ this.url }}.</div>
      <v-alert
        :value="success"
        type="success"
        border="bottom"
        icon="mdi-check-circle"
        transition="scale-transition"
      >
        {{ this.url }} is online!
      </v-alert>
      <v-alert
        :value="failure"
        type="error"
        border="bottom"
        icon="mdi-close-circle"
        transition="scale-transition"
      >
        {{ this.url }} responded with an error <strong>{{ this.error }}</strong
        >!
      </v-alert>
    </v-card-text>
    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text @click="checkStatus">
        <v-icon>mdi-refresh</v-icon>
        &nbsp;Retry
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "CheckStatus",
  computed: {
    success: function () {
      if (this.status === null) return false;
      return this.status;
    },
    failure: function () {
      if (this.status === null) return false;
      return !this.status;
    },
  },
  data() {
    return {
      error: null,
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
      this.status = null;
      try {
        const { data } = await this.$http.get(this.url);
        this.status = data.result === "ok";
      } catch (error) {
        console.error("Check %s(%s) Error:", this.name, this.url, error);
        this.status = false;
        this.error = error.message;
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
