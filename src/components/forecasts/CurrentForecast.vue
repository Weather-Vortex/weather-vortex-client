<template>
  <v-container>
    <v-row>
      <v-col> {{ loading }} - {{ status }} </v-col>
    </v-row>
    <v-row>
      <v-col
        ><ForecastGroup
          v-bind:initialForecasts="forecasts"
          v-bind:initialMid="mid"
      /></v-col>
    </v-row>
  </v-container>
</template>

<script>
import ForecastGroup from "@/components/weather/ForecastGroup";

export default {
  name: "CurrentForecast",
  components: { ForecastGroup },
  computed: {
    guid: {
      get: function () {
        return this.$store.state.guid;
      },
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
          weatherIcon: "mdi-weather-sunny",
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
          weatherIcon: "mdi-weather-rainy",
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
          weatherIcon: "mdi-weather-rainy",
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
          weatherIcon: "mdi-weather-rainy",
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
          weatherIcon: "mdi-weather-rainy",
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
          weatherIcon: "mdi-weather-rainy",
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
          weatherIcon: "mdi-weather-rainy",
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
          weatherIcon: "mdi-weather-rainy",
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
          weatherIcon: "mdi-weather-rainy",
          clouds: 2,
          rain: 2,
          snow: 2,
        },
      ],
      loading: null,
      mid: {
        provider: "Aggregated",
        temp: 25,
        tempMin: 20,
        tempMax: 26,
        pressure: 1001,
        humidity: 11,
        weatherIcon: "mdi-weather-rainy",
        clouds: 2,
        rain: 2,
        snow: 2,
      },
      status: null,
    };
  },
  methods: {
    requireForecasts(locality) {
      console.log("Requested current for:", locality);
      this.$socket.emit("current", { locality });
    },
  },
  watch: {
    guid(value) {
      console.log("Guid modified:", value);
      this.$socket.auth = { username: value };
      this.$socket.connect();
    },
  },
  mounted() {
    // Subscribe to some Socket.IO events.
    this.$socket.on("connect", () => {
      // Now we can require forecasts to our server and listen to future results.
      console.log("Socket Connected");
      const locality = this.$route.params.locality;
      this.requireForecasts(locality);
    });
    this.$socket.on("forecast_requested", (args) => {
      console.log("Forecast Requested Event:", args);
    });
    this.$socket.on("connect_error", (err) => {
      console.warn("Connection error:", err);
      if (err.message === "Invalid locality") {
        this.selectedLocality = false;
      }
    });

    // Assign an unique GUID to this client.
    this.$store.commit("assignGUID");
  },
  destroyed() {
    this.$socket.off("connection");
    this.$socket.off("connect_error");
    this.$socket.off("forecast_requested");
    this.$socket.disconnect();
  },
};
</script>
