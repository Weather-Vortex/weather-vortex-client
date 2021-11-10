<template>
  <v-card min-width="300" class="mx-2 my-1" :loading="loading" elevation="1">
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
        max-width="100%"
      />
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
      // Build the array of card items. Each items contains label, icon, tooltip and value to show.
      let t =
        process.env.NODE_ENV !== "production"
          ? [
              {
                icon: "",
                title: "Time",
                tooltip: this.$props.data.time?.toLocaleString() ?? "",
                value: this.$props.data.time?.toLocaleString() ?? "",
              },
            ]
          : [];
      t.push(
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
          unit: "°C",
          value: this.$props.data.temp,
        },
        {
          icon: "mdi-thermometer-minus",
          title: "Min Temperature",
          tooltip: "Minimal Temperature",
          unit: "°C",
          value: this.$props.data.tempMin,
        },
        {
          icon: "mdi-thermometer-plus",
          title: "Max Temperature",
          tooltip: "Maximum Temperature",
          unit: "°C",
          value: this.$props.data.tempMax,
        },
        {
          icon: "mdi-thermometer",
          title: "Pressure",
          tooltip: "Pressure",
          unit: "bar",
          value: this.$props.data.pressure,
        },
        {
          icon: "mdi-water-percent",
          title: "Humidity",
          tooltip: "Humidity",
          unit: "%",
          value: this.$props.data.humidity,
        },
        {
          icon: "mdi-cloud",
          title: "Clouds",
          tooltip: "Clouds level",
          value: this.$props.data.clouds,
        },
        {
          icon: "mdi-water",
          title: "Rain",
          tooltip: "Rain level",
          value: this.$props.data.rain,
        },
        {
          icon: "mdi-snowflake",
          title: "Snow",
          tooltip: "Snow level",
          value: this.$props.data.snow,
        }
      );
      return t;
    },
  },
  props: {
    provider: String,
    data: {
      time: Date,
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
