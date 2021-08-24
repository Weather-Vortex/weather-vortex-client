<template>
  <v-btn
    class="btn btn-danger btn-block"
    color="primary"
    @click="logout"
  >
    Log Out
  </v-btn>
</template>

<script>
export default {
  name: "LogoutButton",
  methods: {
    logout() {
      localStorage.removeItem("jwt");
      
      this.$router.push("/user/login");
    },
  },
};
</script>