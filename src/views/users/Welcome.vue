<template>
  <div class="main">
    <h3 v-if="loading">
      <strong>Loading</strong>
    </h3>
    <h3 v-if="!loading">
      <h3 v-if="confirmed">
        <strong>Account confirmed!</strong>
        <p>
          Please, <a router to="/user/login">login</a> to use your new account.
        </p>
      </h3>
      <h3 v-else>
        <strong>Account not confirmed!</strong>
      </h3>
    </h3>
    <!--<v-btn @click="sendConfirmation"> confirm account </v-btn>-->
  </div>
</template>

<script>
export default {
  name: "Confirm",
  data() {
    return {
      confirmed: null,
      loading: null,
      name: "",
    };
  },
  mounted() {
    this.name = this.$route.query.name;
    this.sendConfirmation();
  },
  methods: {
    sendConfirmation() {
      this.loading = true;
      this.$http

        .get(`http://localhost:12000/api/confirm/${this.name}`)

        .then((response) => {
          const { confirmed } = response.data;
          this.confirmed = confirmed;
        })

        .catch((error) => {
          console.error(error);
          this.confirmed = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
