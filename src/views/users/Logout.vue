<template>
  <div>
    <h2>Do you really want to log out?</h2>
    <v-btn color="primary" @click="logout">
      Log Out
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "LogoutButton",
  methods: {
    logout() {
      const server = process.env.VUE_APP_SERVER_URL;
      let url = `${server}/api/logout`;
      this.$http
        .get(url, { withCredentials: true })
        .then(() => {
          this.$alert("You are logged out").then(() => {
            this.$cookies.remove("auth");
            this.$store.commit("logout");
            //una volta che ha fatto logout va alla home
            this.$router.push("/");
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
