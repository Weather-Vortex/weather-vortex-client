<template>
  <v-container>
    <v-row>
      <v-col class="ma-auto">
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="pages"
            :total-visible="7"
          ></v-pagination></div
      ></v-col>
      <v-col class="ma-auto">
        <div class="text-center">
          <v-text-field
            label="Filter Provider"
            append-icon="mdi-magnify"
            @click:append="setFilter"
            :loading="isLoading"
            placeholder="Insert provider name"
            single-line
            type="text"
            v-model="filter"
          >
          </v-text-field>
        </div>
      </v-col>
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
    isLoading() {
      return this.loading === true;
    },
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
      filter: null,
      forecasts: this.initialForecasts,
      loading: null,
      page: 1,
    };
  },
  methods: {
    setFilter: function(value) {
      console.log("Set filter:", value);
    },
  },
  props: ["initialForecasts"],
  watch: {
    filter: function(value) {
      this.setFilter(value);
    },
  },
};
</script>
