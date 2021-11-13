<template>
  <div>
    Search for a Forecast!
    <template>
      <v-row align="center">
        <v-col md="6" offset-md="3"
          ><v-img
            align="center"
            src="@/assets/weatherfewclouds.jpg"
          ></v-img></v-col></v-row
    ></template>

    <CloudEffect />
  </div>
</template>

<script>
import CloudEffect from "@/components/CloudEffect.vue";
export default {
  name: "EmptyForecast",

  components: {
    CloudEffect,
  },
};
</script>
