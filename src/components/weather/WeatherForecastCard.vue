<template>
  <v-card class="mx-auto" width="400">
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
      <v-list-item>
        <v-list-item-title>Min Temperature</v-list-item-title>

        <v-list-item-icon>
          <v-icon>mdi-thermometer-minus</v-icon>
        </v-list-item-icon>

        <v-list-item-subtitle class="text-right">
          {{ tempMin }}
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Max Temperature</v-list-item-title>

        <v-list-item-icon>
          <v-icon>mdi-thermometer-plus</v-icon>
        </v-list-item-icon>

        <v-list-item-subtitle class="text-right">
          {{ tempMax }}
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Pressure</v-list-item-title>

        <v-list-item-icon>
          <v-icon>mdi-thermometer</v-icon>
        </v-list-item-icon>

        <v-list-item-subtitle class="text-right">
          {{ pressure }}
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Humidity</v-list-item-title>

        <v-list-item-icon>
          <v-icon>mdi-water-percent</v-icon>
        </v-list-item-icon>

        <v-list-item-subtitle class="text-right">
          {{ humidity }}
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Weather</v-list-item-title>

        <v-list-item-icon>
          <v-icon>{{ weatherIcon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-subtitle class="text-right">
          Weather description
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Clouds</v-list-item-title>

        <v-list-item-icon>
          <v-icon>mdi-cloud</v-icon>
        </v-list-item-icon>

        <v-list-item-subtitle class="text-right">
          {{ clouds }}
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Rain</v-list-item-title>

        <v-list-item-icon>
          <v-icon>mdi-weather-pouring</v-icon>
        </v-list-item-icon>

        <v-list-item-subtitle class="text-right">
          {{ rain }}
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Snow</v-list-item-title>

        <v-list-item-icon>
          <v-icon>mdi-weather-snowy</v-icon>
        </v-list-item-icon>

        <v-list-item-subtitle class="text-right">
          {{ snow }}
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
