<template>
  <v-app>
    <v-main class="blue lighten-5">
      <v-container align="center" justify="center">
        <v-row class="bg-img" justify="space-around">
          <v-col md="6" offset-md="3">
            <PrivateUserCard @profile="getProfile" />
          </v-col>
        </v-row>
      </v-container>

      <v-container>
        <v-row class="mb-3" no-gutters>
          <v-col md="4" class="pa-md-10 mx-lg-auto">
            <h2 class="pa-md-8 sm-10 mx-lg-auto">
              Control Units<v-btn class="mx-2" small fab dark color="indigo"
                ><v-icon>mdi-plus</v-icon></v-btn
              >
            </h2>

            <PrivateUserControlUnits />
          </v-col>
          <v-col md="4" offset-md="4" class="pa-md-10 mx-lg-auto">
            <h2 class="pa-md-8 sm-10 mx-lg-auto">
              Reviews
              <v-btn class="mx-2" small fab dark color="indigo"
                ><v-icon>mdi-plus</v-icon></v-btn
              >
            </h2>
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
  /*l'immagine è anche in assets (clouds.jpg) ma non riesco a fargli riconoscere il percorso*/
  background-image: url("https://pixabay.com/get/g73bbb070772384eeb994bfd384579c7ad1313beeee434e7b550bfbfea53ff32a92fd24e35800768b5577d31527dd187bffdd97c587aebe9c2d44e127271dae6f_1920.jpg");
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
    getProfile(profile) {
      console.log(profile);
      return profile;
    },
    deleteUser() {
      const id = this.$cookies.get("id");
      const server = process.env.VUE_APP_SERVER_URL;
      this.$alert(id);
      let url = `${server}/api/${id}`;
      //let indexOfArrayItem = this.profile.findIndex((i) => i._id === id);

      if (window.confirm("Do you really want to delete?")) {
        this.$http
          .delete(url)
          .then(() => {
            //this.profile.splice(indexOfArrayItem, 1);
            this.$router.push("/");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, //rifare quello che hai fatto nel logout, togliere il cookie e
    //reindirizzare alla home*/
  },
};
</script>
