<template>
  <v-container>
    <v-row>
      <v-col v-for="forecast in forecasts" :key="forecast.provider">
        <WeatherForecastCard v-bind="forecast" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WeatherForecastCard from "@/components/weather/WeatherForecastCard";
export default {
  name: "CurrentForecast",
  components: { WeatherForecastCard },
  data() {
    return {
      forecasts: [
        {
          provider: "OpenWeatherMap",
          temp: 24,
          tempMin: 21,
          tempMax: 27,
          pressure: 1000,
          humidity: 12,
          weatherIcon: "mdi-sun",
          clouds: 3,
          rain: 3,
          snow: 3,
        },
        {
          provider: "Troposphere",
          temp: 25,
          tempMin: 20,
          tempMax: 26,
          pressure: 1001,
          humidity: 11,
          weatherIcon: "mdi-rain",
          clouds: 2,
          rain: 2,
          snow: 2,
        },
      ],
    };
  },
};
</script>
