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
      initialMidData: {
        temp: 0,
        tempMin: 0,
        tempMax: 0,
        pressure: 0,
        humidity: 0,
        weatherIcon: "mdi-weather-rainy",
        weatherDescription: "Rainy",
        clouds: 0,
        rain: 0,
        snow: 0,
      },
      midData: {},
      mid: {
        provider: "Aggregated",
        data: {},
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
      this.mid.data = JSON.parse(JSON.stringify(this.initialMidData));
      this.midData = JSON.parse(JSON.stringify(this.initialMidData));
    },
    connect: function () {
      const username = uuidv4();
      this.socket = create();
      this.subscribe();
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
        if (typeof args.providers !== "object") {
          console.error("Received a corrupted packet from socket");
          this.fetching = this.fetching - 1;
          return;
        }

        args.providers.forEach((provider) => {
          this.waiting.push({ provider: provider });
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
          (forecast) => forecast.provider !== provider
        );
        console.log("Fetched %o from %o", current.provider, this.waiting);
        this.forecasts.push({ provider, data });
        // this.mid.data = data;
        this.updateMid(data);
      });
    },
    updateMid: function (data) {
      const keys = Object.keys(data);
      keys.forEach((elem) => {
        const value = Number(data[elem]);
        if (isNaN(value)) {
          console.log("NAN");
        } else {
          this.midData[elem] += value;
          const num = this.midData[elem] / this.forecasts.length;
          const fixed = Number.parseFloat(num).toFixed(2);
          this.mid.data[elem] = fixed;
          if (elem === "pressure") {
            console.log(
              "Add %f to %f div by %d result to %f fixed to %f",
              value,
              this.midData[elem],
              this.forecasts.length,
              num,
              this.mid.data[elem]
            );
          }
        }
      });
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
