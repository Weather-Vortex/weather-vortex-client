<template>
  <v-card class="mx-auto">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5">
          From {{ $route.params.locality }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ now }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-slider
      v-model="time"
      :max="1"
      :tick-labels="times"
      class="mx-4"
      ticks
    ></v-slider>

    <v-slide-group multiple show-arrows>
      <v-slide-item v-for="time in times" :key="time" v-slot="{ active }">
        <v-btn
          class="mx-2"
          :input-value="active"
          active-class="purple white--text"
          depressed
          rounded
          @click="changeTime(time)"
        >
          Options {{ time.description }}
        </v-btn>
      </v-slide-item>
    </v-slide-group>

    <v-card-text>
      <v-spacer />
      <router-view />
      <v-spacer />
    </v-card-text>

    <v-card-actions>
      <v-btn text>Report a Problem</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "LocalityForecast",
  data: () => ({
    currentTime: null,
    now: new Date().toLocaleString(),
    /* If number of times changes, update the slider max attr too. */
    times: [
      {
        description: "Current",
        path: "/current",
      },
      { description: "Three Days", path: "/threedays" },
    ],
  }),
  methods: {
    changeTime: (time) => {
      console.log("Change time:", time);
      this.currentTime = time;
      console.log(this.currentTime);
    },
  },
  watch: {
    currentTime() {
      const t = this.currentTime;
      this[t] = !this[t];
    },
  },
};
</script>