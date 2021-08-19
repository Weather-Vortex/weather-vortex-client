<template>
  <v-container>
    <v-row>
      <v-col
        >Connected: {{ connected }} - Loading: {{ loading }} - Fetching:
        {{ fetching }}
      </v-col>
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
import create from "@/socket";
import ForecastGroup from "@/components/weather/ForecastGroup";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "CurrentForecast",
  components: { ForecastGroup },
  computed: {
    connected: function () {
      return (
        typeof this.socket !== "undefined" &&
        this.socket !== null &&
        this.socket.connected
      );
    },
    loading: function () {
      return this.fetching > 0;
    },
  },
  data() {
    return {
      fetching: 0,
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
      socket: null,
      status: null,
      waiting: [],
    };
  },
  methods: {
    connect: function () {
      const username = uuidv4();
      this.socket = create();
      this.subscribe();
      console.log("Username: %s with socket %s", username, this.socket.id);
      this.socket.auth = { username };
      this.socket.connect({ forceNew: true });
    },
    clean: function () {
      this.forecasts = [];
      this.waiting = [];
      this.mid = {};
    },
    disconnect: function () {
      const instance = this.socket;
      instance.off("connection");
      instance.off("connect_error");
      instance.off("forecast_requested");
      instance.off("result");
      // state. socket.disconnect();
      // this.$socket.close();
      instance.disconnect();
      this.socket = null;
    },
    requireForecasts: function (locality) {
      console.log("Requested current for:", locality);
      this.fetching = this.fetching + 1;
      this.clean();
      this.socket.emit("current", { locality });
    },
    subscribe: function () {
      this.socket.on("connect", () => {
        // Now we can require forecasts to our server and listen to future results.
        console.log("Socket Connected");
        const locality = this.$route.params.locality;
        this.requireForecasts(locality);
      });

      this.socket.on("forecast_requested", (args) => {
        if (typeof args.providers !== "object") {
          console.error("Received a corrupted packet from socket");
          this.fetching = this.fetching - 1;
          return;
        }

        args.providers.forEach((provider) => {
          this.waiting.push({ provider });
        });

        this.fetching = this.fetching + args.providers.length - 1;
      });
      this.socket.on("connect_error", (err) => {
        console.warn("Connection error:", err);
        if (err.message === "Invalid locality") {
          this.selectedLocality = false;
        }
      });
      this.socket.on("result", (result) => {
        console.log("Result from %s with %o:", result.provider, result.data);
        const { provider, data } = result;
        this.fetching = this.fetching - 1;
        const current = this.waiting.filter(
          (forecast) => forecast.provider === provider
        );
        current.data = data;
        this.forecasts.push(current);
      });
    },
  },
  watch: {
    connected(value) {
      if (value && this.socket) {
        console.log("connected");
      }
    },
  },
  mounted() {
    console.log("mounted");
    if (!this.connected) {
      this.connect();
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log("Before route leave from %s to %s", from, to);
    next();
  },
  destroyed() {
    console.log("Destroyed");
    if (this.connected) {
      this.disconnect();
    }
  },
};
</script>
