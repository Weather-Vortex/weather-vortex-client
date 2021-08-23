<template>
  <v-app>
    <v-main class="blue lighten-5">
      <v-container align="center" justify="center">
        <v-row class="bg-img" justify="space-around">
          <v-col md="6" offset-md="3">
           <PrivateUserCard/>
          </v-col>
        </v-row>
      </v-container>

      <v-container
        ><v-div></v-div>
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
    </v-main>
  </v-app>
</template>

<style>
.bg-img {
  /*al momento non ho messo clouds di jpg in assets perchè non mi riconosce il percors*/
  background-image: url("clouds.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  border-radius: 3px;
}
</style>
<script>
import PrivateUserControlUnits from "@/components/user/PrivateUserControlUnits";
import PrivateUserReviews from "@/components/user/PrivateUserReviews";
import PrivateUserCard from "@/components/user/PrivateUserCard"
export default {
  name: "privateProfile",
  components: { PrivateUserControlUnits, PrivateUserReviews, PrivateUserCard },
  data: () => ({

  }),
};
</script>

