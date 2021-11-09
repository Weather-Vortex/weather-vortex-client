<template>
  <v-container>
    <v-row>
      <v-col>
        <v-slide-group v-model="day" show-arrows center-active>
          <v-slide-item
            v-for="day in days"
            :key="day.val"
            v-slot:default="{ active, toggle }"
          >
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  active-class="purple white--text"
                  depressed
                  rounded
                  v-bind="attrs"
                  v-on="on"
                  @click="toggle"
                  :input-value="active"
                >
                  {{ day.label }}
                </v-btn>
              </template>
              <span>{{ day.tooltip }}</span>
            </v-tooltip>
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
    <v-row v-if="debug">
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
    connected: function () {
      return (
        typeof this.socket !== "undefined" &&
        this.socket !== null &&
        this.socket.connected
      );
    },
    /**
     * The current time selected from the user.
     */
    current: function () {
      const old = new Date();
      old.setDate(old.getDate() + this.day);
      old.setTime(old.getTime() + this.time * 3 * 60 * 60 * 1000);
      return old;
    },
    /**
     * Forecast selected with current time.
     */
    forecasts: function () {
      if (typeof this.allForecasts !== "object") return undefined;
      const temps = nextForecast(this.allForecasts, this.current);
      return temps;
    },
    /**
     * Average forecast with current time.
     */
    mid: function () {
      // Process only if we have some forecasts selected.
      if (typeof this.forecasts !== "object" || this.forecasts.length < 1) {
        return null;
      }

      // Update this.results array.
      this.cleanMinimal();
      this.forecasts.forEach((each) => {
        this.updateMid(each.data);
      });
      return {
        provider: "Aggregated",
        data: this.results,
      };
    },
    /**
     * Labels of hours to show.
     */
    labels: function () {
      /* 
      If number of modes changes, update the slider max attr too.
      Actually show 8 different hours (3h hop), starting from next hour.
      */
      const now = new Date().getHours() - new Date().getTimezoneOffset() / 60;
      console.log("Difference:", new Date().getTimezoneOffset());

      return Array.from(Array(8)).map((_, i) =>
        ((i * 3 + now) % 24).toString()
      );
    },
    /**
     * True if some providers missing, false anywhere.
     */
    loading: function () {
      return this.fetching > 0;
    },
    /**
     * The selected time from first forecast.
     */
    selectedTime: function () {
      let selected =
        this.forecasts && this.forecasts.length > 0
          ? new Date(this.forecasts[0].data.time)
          : this.current;

      const calculated = new Date(
        selected - new Date().getTimezoneOffset() / 60
      );

      // const str = calculated.toLocaleString(); // .toISOString(); // .substr(0, 10);
      return calculated;
    },
    debug: function () {
      return process.env.NODE_ENV !== "production";
    },
  },
  data() {
    return {
      allForecasts: [], // Forecasts fetched.
      day: 0, // Day selected.
      days: [
        // Days values.
        { val: 0, label: "Today", tooltip: "Forecast for Today" },
        { val: 1, label: "Tomorrow", tooltip: " Forecast for Tomorrow" },
        {
          val: 2,
          label: "In 2 days",
          tooltip: "Forecast for The day after tomorrow",
        },
      ],
      time: 0, // Selected time.
      fetching: 0, // Missing providers.
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
      results: {},
      descriptions: new Map(),
      icons: new Map(),
      socket: null,
      status: null,
      waiting: [],
    };
  },
  methods: {
    clean: function () {
      this.allForecasts = [];
      this.waiting = [];
      this.cleanMinimal();
    },
    cleanMinimal: function () {
      this.midData = JSON.parse(JSON.stringify(this.initialMidData));
      this.results = JSON.parse(JSON.stringify(this.initialMidData));
      // Needs to be two separated maps.
      this.descriptions = new Map();
      this.icons = new Map();
    },
    connect: function () {
      const username = uuidv4();
      this.socket = create();
      this.subscribe();
      console.log("Username %s with socket %s", username, this.socket.id);
      this.socket.auth = { username };
      this.socket.connect({ forceNew: true });
    },
    disconnect: function () {
      const instance = this.socket;
      instance.off("connection");
      instance.off("connect_error");
      instance.off("forecast_requested");
      instance.off("result");
      instance.disconnect();
      this.socket = null;
    },
    requireForecasts: function (locality) {
      this.fetching = this.fetching + 1;
      this.clean();
      const split = locality.split(",");
      if (split && split.length === 2) {
        const latitude = new Number(split[0]);
        const longitude = new Number(split[1]);
        if (!isNaN(latitude) && !isNaN(longitude)) {
          console.log("Requiring %d::%d", latitude, longitude);
          this.socket.emit("threedays", { latitude, longitude });
          return;
        }
      }
      this.socket.emit("threedays", { locality });
    },
    subscribe: function () {
      this.socket.on("connect", () => {
        const locality = this.$route.params.locality;
        this.requireForecasts(locality);
      });

      this.socket.on("forecast_requested", (args) => {
        if (typeof args.providerNames !== "object") {
          const errorMessage = "Received a corrupted packet from socket";
          const title = "Forecasts";
          const type = "error";
          this.$alert(errorMessage, title, type);
          console.error(errorMessage, args);
          this.fetching = this.fetching - 1;
          return;
        }

        // Put into waiting queue required provider names.
        args.providerNames.forEach((provider) => {
          this.waiting.push({ provider });
        });

        // Add to fetching count the number of provider names.
        this.fetching = this.fetching + args.providerNames.length - 1;
      });

      this.socket.on("connect_error", (err) => {
        console.warn("Connection error:", err);
        if (err.message === "Invalid locality") {
          this.selectedLocality = false;
        }
      });

      this.socket.on("result", (result) => {
        const { provider, data } = result;
        console.log("Result from %s with: %o", provider, data);
        this.fetching = this.fetching - 1;
        const current = this.waiting.filter(
          (forecast) => forecast.provider !== provider
        );
        this.waiting = current;
        this.allForecasts.push({ provider, data });
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
            this.results.weatherDescription = keyWithMaxValue;
          } else if (elem === "weatherIcon") {
            // Update weather icon map.
            this.populateMap(desc, this.icons);
            const keyWithMaxValue = this.getMostValueKeyFromMap(this.icons);
            this.results.weatherIcon = keyWithMaxValue;
          }
        } else {
          this.midData[elem] += value;
          const num = this.midData[elem] / this.forecasts.length;
          const fixed = Number.parseFloat(num).toFixed(2);
          this.results[elem] = fixed;
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
  watch: {
    current(value) {
      if (this.debug) console.log("Changed current:", value.toLocaleString());
    },
    day(value) {
      if (this.debug) console.log("Changed day:", value);
    },
    time(value) {
      if (this.debug) console.log("Changed time:", value);
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
