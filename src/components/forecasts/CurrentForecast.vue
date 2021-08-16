<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="pages"
            :total-visible="7"
          ></v-pagination></div
      ></v-col>
    </v-row>
    <v-row>
      <v-col
        cols="4"
        v-for="forecast in someForecasts"
        :key="forecast.provider"
      >
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
  computed: {
    pages() {
      const ceil = Math.ceil(this.forecasts.length / 3);
      return ceil > 0 ? ceil : 1;
    },
    someForecasts: function() {
      return this.forecasts.slice((this.page - 1) * 3, this.page * 3);
    },
  },
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
      page: 1,
    };
  },
};
</script>
