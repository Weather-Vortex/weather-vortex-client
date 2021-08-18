<template>
  <v-app>
    <v-main>
      <v-container align="center" justify="center">
        <v-row class="bg-img" justify="space-around">
          <v-col md="6" offset-md="3">
            <v-card width="400">
              <v-img height="200px" src="@/assets/lavender.jpg">
                <v-app-bar class="mt-8" flat color="rgba(0, 0, 0, 0)">
                  <v-avatar size="100">
                    <img alt="user" src="@/assets/user.png" />
                  </v-avatar>

                  
                </v-app-bar>

                <v-card-title class="white--text mt-8">
                  <h3 class="font-weight-bold ml-3">Nome Cognome</h3>
                </v-card-title>
              </v-img>

              <v-card-text>
                <div class="font-weight-bold ml-8 mb-2">Details</div>

                <v-list two-line>
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
                      <v-list-item-title>●●●●●●●</v-list-item-title>
                      <v-list-item-subtitle>Password</v-list-item-subtitle>
                      
                    </v-list-item-content>

                    <v-list-item-content>
                      <v-btn></v-btn> <!--Personalizza sto bottone-->
                      </v-list-item-content>
                  </v-list-item>

                  <v-divider inset></v-divider>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="indigo"> mdi-map-marker </v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>Weather Vortex</v-list-item-title>
                      <v-list-item-subtitle>Online</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.bg-img {
  /*l'immagine è anche in assets (cloud.jpg) ma non riesco a fargli riconoscere il percorso*/
  background-image: url("https://pixabay.com/get/g2de72f7ddd24b05fd303f39aab65520ff1b182be9379185aae6a93ac2b2b0292e485349cdc70c9d701975862a256e04e.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  border-radius: 3px;
}
</style>

