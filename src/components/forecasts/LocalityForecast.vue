<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-col>
        <div>From {{ $route.params.locality }}</div></v-col
      >
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col> <router-view /></v-col>
    </v-row>
  </v-container>
</template>