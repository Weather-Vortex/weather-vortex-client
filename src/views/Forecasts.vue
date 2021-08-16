<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-col class="mb-4">
        <h1>Weather Forecasts for {{ $route.params.locality }}</h1>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Forecasts",
};
</script>