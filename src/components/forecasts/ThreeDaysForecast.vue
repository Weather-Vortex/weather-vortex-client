<template>
  <v-card class="mx-auto" min-width="350" width="400">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5">
          Three Days Weather
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-slide-group v-model="day" show-arrows center-active>
      <v-slide-item v-for="day in days" :key="day" v-slot="{ active, toggle }">
        <v-btn
          class="mx-2"
          :input-value="active"
          active-class="purple white--text"
          depressed
          rounded
          @click="toggle"
        >
          {{ day }}
        </v-btn>
      </v-slide-item>
    </v-slide-group>

    <v-slider
      v-model="time"
      :max="7"
      :tick-labels="labels"
      class="mx-4"
      ticks
    ></v-slider>

    <WeatherForecastCard />
  </v-card>
</template>

<script>
import WeatherForecastCard from "@/components/weather/WeatherForecastCard";
export default {
  name: "ThreeDaysForecast",
  components: { WeatherForecastCard },
  data() {
    return {
      day: null,
      days: ["Today", "Tomorrow", "Toyota"],
      /* If number of modes changes, update the slider max attr too. */
      labels: ["0", "3", "6", "9", "12", "15", "18", "21"],
      time: 0,
      forecast: [
        {
          day: "Tuesday",
          icon: "mdi-white-balance-sunny",
          temp: "24\xB0/12\xB0",
        },
        {
          day: "Wednesday",
          icon: "mdi-white-balance-sunny",
          temp: "22\xB0/14\xB0",
        },
        { day: "Thursday", icon: "mdi-cloud", temp: "25\xB0/15\xB0" },
      ],
    };
  },
  watch: {
    mode() {
      console.log(this.mode);
      console.log(this.timePath);
      this.$router.push({ name: this.modes[this.mode] });
    },
  },
};
</script>
