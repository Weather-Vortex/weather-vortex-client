<template>
  <v-container class="forecast">
    <v-row>
      <v-col cols="12" md="6" sm="6" xs="6" class="ma-auto">
        <div class="text-center">
          <v-switch
            v-model="showAggregation"
            :label="showAggregationLabel"
          ></v-switch>
        </div>
      </v-col>
      <v-col v-if="_fetching > 0" cols="12" md="6" sm="6" xs="6">
        Remainings to fetch: {{ _fetching }}
      </v-col>
      <v-col cols="12" md="6" sm="6" xs="12" class="ma-auto">
        <div class="text-center">
          <v-text-field
            label="Filter Provider"
            append-icon="mdi-magnify"
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
      <v-col md="6" offset-md="3">
        <WeatherForecastCard v-if="showAggregation" v-bind="mid" />
      </v-col>
      <v-col md="12" xs="6" offset-md="1">
        <template>
          <vue-horizontal responsive class="horizontal" :displacement="0.7">
            <!-- <template v-slot:btn-next>
              <v-div class="replaced-btn">
                <v-icon>
                  mdi-chevron-right
                </v-icon>
              </v-div>
            </template>-->

            <section
              class="content"
              v-for="forecast in someForecasts"
              :key="forecast.provider"
            >
              <WeatherForecastCard
                v-bind:provider="forecast.provider"
                v-bind:data="forecast.data"
              />
            </section>
          </vue-horizontal>
        </template>
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
    showAggregationLabel: function() {
      return this.showAggregation ? "Show aggregation" : "Hide aggregation";
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
  props: ["initialForecasts", "initialMid", "fetching"],
};
</script>

<style scoped>
.horizontal >>> .v-hl-btn-prev svg {
  background: blue;
  color: white;
  border-radius: 0;
}

.horizontal >>> .v-hl-btn-next {
  top: 0;
  bottom: 0;
  transform: translateX(0);
}

.replaced-btn {
  height: 100%;
  background: linear-gradient(to right, #ffffff00, white);
  padding-left: 48px;
  display: flex;
  align-items: center;
}

.replaced-btn > div {
  font-weight: 700;
  font-size: 15px;
  line-height: 1;
  color: black;
  padding: 8px 12px;
  background: white;
  border-radius: 3px;
  border: 1px solid black;
}
.forecast {
  background: #e1f3f3;
}
</style>
