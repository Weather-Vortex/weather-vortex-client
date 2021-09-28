<template>
  <v-container>
    <v-row>
      <v-col>
        <v-slide-group v-model="day" show-arrows center-active>
          <v-slide-item
            v-for="day in days"
            :key="day.val"
            v-slot="{ active, toggle }"
          >
            <v-btn
              class="mx-2"
              :input-value="active"
              active-class="purple white--text"
              depressed
              rounded
              @click="toggle"
            >
              {{ day.label }}
            </v-btn>
          </v-slide-item>
        </v-slide-group>
      </v-col>
      <v-col>
        <v-slider
          v-model="time"
          :max="7"
          :tick-labels="labels"
          class="mx-4"
          ticks
        ></v-slider
      ></v-col>
    </v-row>
    <v-row>
      <v-col>
        <span>{{ this.current.toLocaleString() }}</span>
      </v-col>
      <v-col>
        <span>{{ this.selectedTime.toLocaleString() }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ForecastGroup
          :fetching="fetching"
          :initialForecasts="forecasts"
          :initialMid="mid"
      /></v-col>
    </v-row>
  </v-container>
</template>

<script>
import create from "@/socket";
import ForecastGroup from "@/components/weather/ForecastGroup";
import { v4 as uuidv4 } from "uuid";

/**
 * Get the next time from current selected from user in the data collection.
 * @param {Array<Forecast>} elems Forecasts array.
 * @param {Date} current User selected date.
 * @returns Forecast data.
 */
const nextTime = (elems, current) =>
  elems.find((data) => {
    // Find the item with the successive time from current.
    if (data.time === undefined) return false;
    return new Date(data.time) > current;
  });

/**
 * Get all forecast with next time from selected.
 * @param {Array<Provider>} elems { provider, data } array.
 * @param {Date} current User selected date.
 * @returns Forecast data.
 */
const nextForecast = (elems, current) =>
  elems.map((m) => {
    if (m.data === undefined) return undefined;
    const data = nextTime(m.data, current);
    return {
      provider: m.provider,
      data: data,
    };
  });

export default {
  name: "ThreeDaysForecast",
  components: { ForecastGroup },
  computed: {
    /**
     * Get if the socket is connected or not.
     */
    connected: function() {
      return (
        typeof this.socket !== "undefined" &&
        this.socket !== null &&
        this.socket.connected
      );
    },
    /**
     * The current time selected from the user.
     */
    current: function() {
      const old = new Date();
      old.setDate(old.getDate() + this.day);
      old.setTime(old.getTime() + this.time * 3 * 60 * 60 * 1000);
      return old;
    },
    /**
     * Forecast selected with current time.
     */
    forecasts: function() {
      if (typeof this.allForecasts !== "object") return undefined;
      const temps = nextForecast(this.allForecasts, this.current);
      return temps;
    },
    /**
     * Average forecast with current time.
     */
    mid: function() {
      if (typeof this.allMid.data !== "object" || this.allMid.data.length < 1)
        return null;
      const temps = nextTime(this.allMid.data, this.current);
      return {
        provider: this.allMid.provider,
        data: temps,
      };
    },
    /**
     * Labels of hours to show.
     */
    labels: function() {
      /* 
      If number of modes changes, update the slider max attr too.
      Actually show 8 different hours (3h hop), starting from next hour.
      */
      const now = new Date().getHours() + 1;
      return Array.from(Array(8)).map((_, i) =>
        ((i * 3 + now) % 24).toString()
      );
    },
    /**
     * True if some providers missing, false anywhere.
     */
    loading: function() {
      return this.fetching > 0;
    },
    /**
     * The selected time from first forecast.
     */
    selectedTime: function() {
      if (this.forecasts && this.forecasts.length > 0) {
        return new Date(this.forecasts[0].data.time);
      }
      return this.current;
    },
  },
  data() {
    return {
      allForecasts: [], // Forecasts fetched.
      day: 0, // Day selected.
      days: [
        // Days values.
        { val: 0, label: "Today" },
        { val: 1, label: "Tomorrow" },
        { val: 2, label: "In 2 days" },
      ],
      time: 0, // Selected time.
      fetching: 0, // Missing providers.
      allMid: [
        //
        {
          provider: "Aggregated",
          data: {
            time: "2021-09-09T16:00:00.000Z",
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
      ],
      socket: null,
      status: null,
      waiting: [],
    };
  },
  methods: {
    clean: function() {
      this.allDorecasts = [];
      this.waiting = [];
      this.allMid = [];
    },
    connect: function() {
      const username = uuidv4();
      this.socket = create();
      this.subscribe();
      console.log("Username %s with socket %s", username, this.socket.id);
      this.socket.auth = { username };
      this.socket.connect({ forceNew: true });
    },
    disconnect: function() {
      const instance = this.socket;
      instance.off("connection");
      instance.off("connect_error");
      instance.off("forecast_requested");
      instance.off("result");
      instance.disconnect();
      this.socket = null;
    },
    requireForecasts: function(locality) {
      console.log("Requested current for: ", locality);
      this.fetching = this.fetching + 1;
      this.clean();
      this.socket.emit("threedays", { locality });
    },
    subscribe: function() {
      this.socket.on("connect", () => {
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
        const { provider, data } = result;
        console.log("Result from %s", provider);
        this.fetching = this.fetching - 1;
        const current = this.waiting.filter(
          (forecast) => forecast.provider !== provider
        );
        this.waiting = current;
        console.log(
          "Waiting:",
          this.waiting.map((m) => m.provider.toString())
        );
        console.log("Fetched %o", current.provider);
        this.allForecasts.push({ provider, data });
        this.allMid = { provider: "Aggregated", data };
      });
    },
  },
  watch: {
    current(value) {
      console.log("Changed current:", value.toLocaleString());
    },
    day(value) {
      console.log("Changed day:", value);
    },
    time(value) {
      console.log("Changed time:", value);
    },
  },
  mounted() {
    if (!this.connected) {
      this.connect();
    }
  },
  beforeDestroy() {
    console.log("Before Destroy");
    if (this.connected) {
      this.disconnect();
      console.log("Destroy");
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log("Before route leave from %s to %s", from, to);
    if (this.connected) {
      // this.disconnect();
    }
    next();
  },
  destroyed() {
    console.log("Destroyed");
    if (this.connected) {
      this.disconnect();
      console.log("After Destroy");
    }
  },
};
</script>
