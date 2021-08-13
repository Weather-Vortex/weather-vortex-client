<template>
  <div class="about">
    <h1>This is an about page.</h1>
    <p>Server status {{ status }}</p>
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      status: null,
      loading: false,
    };
  },
  methods: {
    async getServerStatus() {
      this.loading = true;
      const info = "http://localhost:49161/";
      try {
        const response = await this.$http.get(info);
        console.log(response);
        this.status = response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.getServerStatus();
  },
};
</script>