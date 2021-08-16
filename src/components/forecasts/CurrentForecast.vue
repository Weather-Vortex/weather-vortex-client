<template>
  <v-container>
    <v-row>
      <v-col>Current Forecasts</v-col>
    </v-row>
    <v-row>
      <v-col><ForecastGroup v-bind:initialForecasts="forecasts"/></v-col>
    </v-row>
  </v-container>
</template>

<script>
import ForecastGroup from "@/components/weather/ForecastGroup";
export default {
  name: "CurrentForecast",
  components: { ForecastGroup },
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
        {
          provider: "IoT Weather Station",
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
        {
          provider: "IoT Weather Station 2",
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
        {
          provider: "IoT Weather Station 3",
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
        {
          provider: "IoT Weather Station 4",
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
        {
          provider: "IoT Weather Station 5",
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
        {
          provider: "IoT Weather Station 6",
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
        {
          provider: "IoT Weather Station 7",
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
