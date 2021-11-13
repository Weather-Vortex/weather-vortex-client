<template>
  <v-app>
    <v-main class="blue lighten-5">
      <v-container align="center" justify="center">
        <v-row class="bg-img" justify="space-around">
          <v-col md="6" offset-md="3">
            <PrivateUserCard />
          </v-col>
        </v-row>
      </v-container>

      <v-container>
        <v-row class="mb-3" no-gutters>
          <v-col md="6" cols="12" class="pa-md-10">
            <PrivateUserControlUnits />
          </v-col>
          <v-col md="6" cols="12" class="pa-md-10">
            <PrivateUserReviews />
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-btn class="ma-2" outlined color="indigo" @click="deleteUser()">
          Delete your account!
        </v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.bg-img {
  background-image: url("../../assets/clouds.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  border-radius: 3px;
}
</style>
<script>
import PrivateUserControlUnits from "@/components/user/PrivateUserControlUnits";
import PrivateUserReviews from "@/components/user/PrivateUserReviews";
import PrivateUserCard from "@/components/user/PrivateUserCard";
export default {
  name: "privateProfile",
  components: { PrivateUserControlUnits, PrivateUserReviews, PrivateUserCard },
  data: () => ({}),
  methods: {
    deleteUser() {
      const server = process.env.VUE_APP_SERVER_URL;
      const url = `${server}/auth/`;

      this.$confirm("Are you sure to delete your account?").then(() => {
        this.$http
          .delete(url, { withCredentials: true })
          .then(() => {
            this.$cookies.remove("auth");
            this.$store.commit("logout");
            // una volta che ho eliminato va alla home
            this.$router.push("/");
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },
};
</script>
