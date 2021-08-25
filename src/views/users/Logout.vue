<template>
<div>
  <h2>Do you really want to log out?</h2>
  <v-btn
    color="primary"
    @click="logout"
  >
    Log Out
  </v-btn>
  </div>
</template>

<script>
  export default {
    name: 'LogoutButton',
    methods: {
      logout() {
        let url = "http://localhost:12000/api/logout";
      this.$http
        .get(url, {
          email: this.email,
          password: this.password,
        })
        .then(() => {
              localStorage.removeItem('jwt')
              //una volta che ha fatto logout va alla home
              this.$router.push("/");
          
        })
        .catch((error) => {
          console.error(error);
        });
      },
    },
  };
</script>