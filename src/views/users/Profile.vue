<template>
  <v-app>
    <v-main class="blue lighten-5"  >
      <v-container align="center" justify="center">
        <v-row class="bg-img" justify="space-around">
          <v-col md="6" offset-md="3">
            <v-card width="400" class="blue lighten-5">
              <v-img height="200px" src="@/assets/lavender.jpg">
                <v-app-bar class="mt-8" flat color="rgba(0, 0, 0, 0)">
                  <v-avatar size="100">
                    <img alt="user" src="@/assets/user.png" />
                  </v-avatar>
                </v-app-bar>

                <v-card-title class="white--text mt-8">
                  <h3 class="font-weight-bold ml-3">Name Surname</h3>
                </v-card-title>
              </v-img>

              <v-card-text>
                <div class="font-weight-bold ml-8 mb-2">Details</div>

                <v-list two-line class="blue lighten-5">
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="indigo"> mdi-email </v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>silvia@gmail.com</v-list-item-title>
                      <v-list-item-subtitle
                        >Personal Email</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider inset></v-divider>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="indigo"> mdi-lock </v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>
                        <v-text-field
                          type="password"
                          label="Password"
                          v-model="password"
                          :disabled="!toggleDisable"
                        >
                        </v-text-field>
                      </v-list-item-title>
                      <v-list-item-subtitle>Edit Password</v-list-item-subtitle>

                      <!--Campo modificabile-> al click del bottoncino disabilitare funzione read only-->
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider inset></v-divider>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="indigo"> mdi-map-marker </v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>
                        <v-text-field
                          label="Position"
                          v-model="position"
                          :disabled="!toggleDisable"
                          :append-icon="
                            show2 ? 'mdi-map-marker-off' : 'mdi-map-marker'
                          "
                          @click:append="show2 = !show2"
                        >
                        </v-text-field>
                      </v-list-item-title>
                      <v-list-item-subtitle>Edit Position</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-btn
                  class="ml-3"
                  :color="toggleDisable ? 'primary' : 'accent'"
                  @click="toggleDisable = !toggleDisable"
                >
                  <v-icon> mdi-pencil </v-icon> Edit
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-spacer></v-spacer>

      <v-container
        ><v-div></v-div>
        <v-row class="mb-3" no-gutters>
          <v-col md="4" class="pa-md-10  mx-lg-auto">
            <h2 class="pa-md-8 sm-10 mx-lg-auto">
              Control Units<v-btn class="mx-2" small fab dark color="indigo"
                ><v-icon>mdi-plus</v-icon></v-btn
              >
            </h2>

            <UserControlUnits />
          </v-col>
          <v-col md="4" offset-md="4" class="pa-md-10  mx-lg-auto">
            <h2 class="pa-md-8 sm-10 mx-lg-auto">
              Reviews
              <v-btn class="mx-2" small fab dark color="indigo"
                ><v-icon>mdi-plus</v-icon></v-btn
              >
            </h2>
            <UserReviews />
          </v-col>
        </v-row>
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
import UserControlUnits from "@/components/weather/UserControlUnits";
import UserReviews from "@/components/UserReviews";
export default {
  name: "privateProfile",
  components: { UserControlUnits, UserReviews },
  data: () => ({
    position: "Cesena",
    password: "Password",
    toggleDisable: false,
    show2: false,
  }),
};
</script>

