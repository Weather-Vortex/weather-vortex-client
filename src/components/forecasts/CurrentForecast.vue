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
        clouds: 0,
        rain: 0,
        snow: 0,
      },
      midData: {},
      descriptions: new Map(),
      icons: new Map(),
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
      // Needs to be two separated maps.
      this.descriptions = new Map();
      this.icons = new Map();
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
        const { provider, data } = result;
        console.log("Result from %s with %o:", provider, data);
        this.fetching = this.fetching - 1;
        const current = this.waiting.filter(
          (forecast) => forecast.provider !== provider
        );
        this.waiting = current;
        this.forecasts.push({ provider, data });
        this.updateMid(data);
      });
    },
    updateMid: function (data) {
      const keys = Object.keys(data);
      keys.forEach((elem) => {
        const value = Number(data[elem]);
        // time and weather icons are not considered.
        if (isNaN(value)) {
          const desc = data[elem];
          if (elem === "weatherDescription") {
            // Update weather description map.
            this.populateMap(desc, this.descriptions);
            const keyWithMaxValue = this.getMostValueKeyFromMap(
              this.descriptions
            );
            this.mid.data.weatherDescription = keyWithMaxValue;
          } else if (elem === "weatherIcon") {
            // Update weather icon map.
            this.populateMap(desc, this.icons);
            const keyWithMaxValue = this.getMostValueKeyFromMap(this.icons);
            this.mid.data.weatherIcon = keyWithMaxValue;
          }
        } else {
          this.midData[elem] += value;
          const num = this.midData[elem] / this.forecasts.length;
          const fixed = Number.parseFloat(num).toFixed(2);
          this.mid.data[elem] = fixed;
        }
      });
    },
    populateMap: function (desc, map) {
      if (map.has(desc)) {
        const actualValue = map.get(desc);
        const increasedValue = actualValue + 1;
        map.set(desc, increasedValue);
      } else {
        map.set(desc, 1);
      }
    },
    getMostValueKeyFromMap: function (map) {
      let keyWithMaxValue = null;
      let maxValueFromKey = 0;
      map.forEach(function (value, key) {
        if (maxValueFromKey < value) {
          keyWithMaxValue = key;
          maxValueFromKey = value;
        }
      });
      return keyWithMaxValue;
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
    if (this.connected) {
      this.disconnect();
    }
  },
};
</script>
