<template>
  <v-container>
    <v-row>
      <v-col>
        <ForecastGroup
          v-bind:fetching="fetching"
          v-bind:initialForecasts="forecasts"
          v-bind:initialMid="mid"
        />
      </v-col>
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
      forecasts: [],
      mid: {
        provider: "Aggregated",
        data: {
          temp: 25,
          tempMin: 20,
          tempMax: 26,
          pressure: 1001,
          humidity: 11,
          weatherIcon: "mdi-weather-rainy",
          weatherDescription: "Rainy",
          clouds: 2,
          rain: 2,
          snow: 2,
        },
      },
      socket: null,
      status: null,
      waiting: [],
    };
  },
  methods: {
    clean: function () {
      this.forecasts = [];
      this.waiting = [];
      this.mid = {};
    },
    connect: function () {
      const username = uuidv4();
      this.socket = create();
      this.subscribe();
      console.log("Username: %s with socket %s", username, this.socket.id);
      this.socket.auth = { username };
      this.socket.connect({ forceNew: true });
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
        console.log("Args:", args);
        if (typeof args.providerNames !== "object") {
          console.error("Received a corrupted packet from socket");
          this.fetching = this.fetching - 1;
          return;
        }

        args.providerNames.forEach((provider) => {
          console.log("Found provider", provider);
          this.waiting.push({ provider: provider });
          console.log("Waiting", this.waiting);
        });

        this.fetching = this.fetching + args.providerNames.length - 1;
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
          (forecast) => forecast.provider !== provider
        );
        console.log("Fetched %o from %o", current.provider, this.waiting);
        this.forecasts.push({ provider, data });
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
    if (!this.connected) {
      this.connect();
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log("Before route leave from %s to %s", from, to);
    if (this.connected) {
      this.disconnect();
    }
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
