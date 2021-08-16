<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-col>
        <div>Current Weather</div>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col>
        <WeatherForecastCard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WeatherForecastCard from "@/components/weather/WeatherForecastCard";
export default {
  name: "CurrentForecast",
  components: { WeatherForecastCard },
};
</script>