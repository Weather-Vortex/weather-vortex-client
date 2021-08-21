
<template>
  <v-container fluid>
    <v-row :align="center" :justify="center">
      <v-spacer> </v-spacer>
      <v-col cols="12" sm="8" md="4" xs="4">
        <v-img src="@/assets/vortex.png"> </v-img>
        <h3>
          <strong>Account confirmed!</strong>
        </h3>
        <router-link to="../views/users/Login.vue">
          <v-btn color="white" flat value="profile">
            <span>Profile</span>
            <v-icon>person</v-icon>
          </v-btn>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

 let url = "http://localhost:12000/api/confirm/:confirmationCode";
      this.$http
        .get(url)
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.error(error);
        });
</script>
