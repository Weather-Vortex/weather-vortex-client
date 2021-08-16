<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Weather Forecasts</h1>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-col>
        <router-view></router-view>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>
