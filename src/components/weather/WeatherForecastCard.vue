<template>
  <v-card class="mx-4 my-1" :loading="loading" elevation="1">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-list v-if="!loading" class="transparent">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="text-h5">
            {{ provider }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <WeatherCardItem
        v-for="type in types"
        :key="type.title"
        v-bind:type="type"
      />
      <!-- Convert other items to component Item. -->
      <v-list-item>
        <v-list-item-title>Min Temperature</v-list-item-title>

        <v-list-item-icon>
          <v-icon>mdi-thermometer-minus</v-icon>
        </v-list-item-icon>

        <v-list-item-subtitle class="text-right">
          {{ data.tempMin }}
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Max Temperature</v-list-item-title>

        <v-list-item-icon>
          <v-icon>mdi-thermometer-plus</v-icon>
        </v-list-item-icon>

        <v-list-item-subtitle class="text-right">
          {{ data.tempMax }}
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Pressure</v-list-item-title>

        <v-list-item-icon>
          <v-icon>mdi-thermometer</v-icon>
        </v-list-item-icon>

        <v-list-item-subtitle class="text-right">
          {{ data.pressure }}
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Humidity</v-list-item-title>

        <v-list-item-icon>
          <v-icon>mdi-water-percent</v-icon>
        </v-list-item-icon>

        <v-list-item-subtitle class="text-right">
          {{ data.humidity }}
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Clouds</v-list-item-title>

        <v-list-item-icon>
          <v-icon>mdi-cloud</v-icon>
        </v-list-item-icon>

        <v-list-item-subtitle class="text-right">
          {{ data.clouds }}
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Rain</v-list-item-title>

        <v-list-item-icon>
          <v-icon>mdi-weather-pouring</v-icon>
        </v-list-item-icon>

        <v-list-item-subtitle class="text-right">
          {{ data.rain }}
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Snow</v-list-item-title>

        <v-list-item-icon>
          <v-icon>mdi-weather-snowy</v-icon>
        </v-list-item-icon>

        <v-list-item-subtitle class="text-right">
          {{ data.snow }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import WeatherCardItem from "@/components/weather/WeatherCardItem";
export default {
  name: "WeatherForecastCard",
  components: { WeatherCardItem },
  computed: {
    loading: function () {
      return typeof this.data === "undefined" || this.data === null;
    },
    types: function () {
      return [
        {
          icon: this.$props.data.weatherIcon,
          title: "Weather",
          tooltip: this.$props.data.weatherDescription,
          value: this.$props.data.weatherDescription,
        },
        {
          icon: "mdi-thermometer",
          title: "Temperature",
          tooltip: "Real Temperature",
          value: this.$props.data.temp,
        },
      ];
    },
  },
  props: {
    provider: String,
    data: {
      temp: Number,
      tempMin: Number,
      tempMax: Number,
      pressure: Number,
      humidity: Number,
      weatherIcon: String,
      weatherDescription: String,
      clouds: Number,
      rain: Number,
      snow: Number,
    },
  },
};
</script>
