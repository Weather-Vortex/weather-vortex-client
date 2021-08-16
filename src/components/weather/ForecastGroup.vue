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
      if (typeof this.forecasts === "undefined") {
        // When this component is created, we don't have this.forecasts yet.
        console.warn("No forecasts now");
        return 1;
      }

      const ceil = Math.ceil(this.forecasts.length / 3);
      return ceil > 0 ? ceil : 1;
    },
    someForecasts: function() {
      if (typeof this.forecasts === "undefined") {
        // When this component is created, we don't have this.forecasts yet.
        console.warn("No forecasts now");
        return undefined;
      }

      return this.forecasts.slice((this.page - 1) * 3, this.page * 3);
    },
  },
  data() {
    return {
      forecasts: this.initialForecasts,
      page: 1,
    };
  },
  props: ["initialForecasts"],
};
</script>
