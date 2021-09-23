<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" sm="6" xs="6" class="ma-auto">
        <div class="text-center">
          <v-switch
            v-model="showAggregation"
            :label="`Show aggregation: ${showAggregation.toString()}`"
          ></v-switch>
        </div>
      </v-col>
      <v-col v-if="_fetching > 0" cols="12" md="6" sm="6" xs="6">
        Remainings: {{ _fetching }}
      </v-col>
      <v-col cols="12" md="6" sm="6" xs="12" class="ma-auto">
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
    <v-row no-gutters>
      <v-col cols="12" sm="4">
        <WeatherForecastCard v-if="showAggregation" v-bind="mid" />
      </v-col>
      <v-col cols="12" sm="8">
        <vue-horizontal show-arrows>
          <v-section v-for="forecast in someForecasts" :key="forecast.provider">
            <WeatherForecastCard
              v-bind:provider="forecast.provider"
              v-bind:data="forecast.data"
            />
          </v-section>
        </vue-horizontal>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WeatherForecastCard from "@/components/weather/WeatherForecastCard";
import VueHorizontal from "vue-horizontal";

export default {
  name: "CurrentForecast",
  components: { WeatherForecastCard, VueHorizontal },
  computed: {
    /*
    Used to tighten and widen the columns if aggregation column is visible or not.
    */
    columns() {
      return this.showAggregation ? 3 : 4;
    },
    _fetching: function() {
      return this.fetching;
    },
    forecasts: function() {
      return this.initialForecasts;
    },
    isLoading() {
      return this.loading === true;
    },
    mid: function() {
      return this.initialMid;
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

      return filtered; // .slice((this.page - 1) * 3, this.page * 3);
    },
  },
  data() {
    return {
      filter: null,
      loading: null,
      showAggregation: true,
    };
  },
  methods: {
    setFilter: function(value) {
      console.log("Set filter:", value);
    },
  },
  props: ["initialForecasts", "initialMid", "fetching"],
};
</script>
