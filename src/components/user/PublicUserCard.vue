<template>
  <v-card width="400" class="blue lighten-5">
    <v-img height="200px" src="@/assets/lavender.jpg">
      <v-app-bar class="mt-8" flat color="rgba(0, 0, 0, 0)">
        <v-avatar size="100">
          <img alt="user" src="@/assets/user.png" />
        </v-avatar>
      </v-app-bar>

      <v-card-title class="white--text mt-8">
        <h3 class="font-weight-bold ml-3">
          Public Profile {{ $route.params.id }}
        </h3>
      </v-card-title>
    </v-img>

    <v-card-text>
      <div class="font-weight-bold ml-8 mb-2">Details</div>

      <v-list two-line class="blue lighten-5">
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo"> mdi-account </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title> Nome Cognome </v-list-item-title>

            <!--Campo modificabile-> al click del bottoncino disabilitare -->
          </v-list-item-content>
        </v-list-item>
        <v-divider inset></v-divider>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo"> mdi-email </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>silvia@gmail.com</v-list-item-title>
            <v-list-item-subtitle>Personal Email</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>
