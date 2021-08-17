<template>
  <v-container>
    <v-row>
      <v-col class="ma-auto">
        <div class="text-center">
          <v-switch
            v-model="showAggregation"
            :label="`Show aggregation: ${showAggregation.toString()}`"
          ></v-switch>
        </div>
      </v-col>
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
      <v-col v-if="showAggregation" :cols="columns">
        <WeatherForecastCard v-bind="mid" />
      </v-col>
      <v-col
        :cols="columns"
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
    columns() {
      return this.showAggregation ? 3 : 4;
    },
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

      let filtered;
      if (typeof this.filter === "string" && this.filter.length > 0) {
        filtered = this.forecasts.filter((elem) =>
          elem.provider.includes(this.filter)
        );
      } else {
        filtered = this.forecasts;
      }

      return filtered.slice((this.page - 1) * 3, this.page * 3);
    },
  },
  data() {
    return {
      filter: null,
      forecasts: this.initialForecasts,
      mid: this.initialMid,
      loading: null,
      page: 1,
      showAggregation: true,
    };
  },
  methods: {
    setFilter: function(value) {
      console.log("Set filter:", value);
    },
  },
  props: ["initialForecasts", "initialMid"],
};
</script>
