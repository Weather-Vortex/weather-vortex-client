<template>
  <v-container align="center" justify="center">
    {{ userId }}
  </v-container>
</template>

<script>
export default {
  name: "PublicProfile",
  data: function () {
    return {
      userId: this.$route.params.id,
    };
  },
  methods: {
    loadUser() {
      const server = process.env.VUE_APP_SERVER_URL;
      const url = `${server}/users/${this.userId}`;
      this.$http
        .get(url)
        .then((res) => {
          console.log("Result:", res);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    },
  },
  mounted() {
    this.loadUser();
  },
};
</script>
