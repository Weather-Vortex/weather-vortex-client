<template>
  <v-card class="mx-auto" min-width="350" width="400">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5">
          {{ provider }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list class="transparent">
      <v-list-item>
        <v-list-item-title>Temperature</v-list-item-title>

        <v-list-item-icon>
          <v-icon>mdi-thermometer</v-icon>
        </v-list-item-icon>

        <v-list-item-subtitle class="text-right">
          {{ temp }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "WeatherForecastCard",
  props: {
    provider: String,
    temp: Number,
    tempMin: Number,
    tempMax: Number,
    pressure: Number,
    humidity: Number,
    weatherIcon: String,
    clouds: Number,
    rain: Number,
    snow: Number,
  },
};
</script>
