<template>
  <v-container class="mt-12">
    <v-row class="text-center">
      <!-- Weather Forecasting Agrgegation Informations -->
      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-5">
          Weather Forecasting Aggregation!
        </h2>

        <v-container>
          <v-row justify-md="center">
            <v-spacer></v-spacer>
            <v-col v-for="(info, i) in weatherInfo" :key="i" cols="12" md="4">
              <InfoCard v-bind="info" />
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-container>
      </v-col>

      <!-- Personal Weather stations -->
      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">
          Personal Weather Stations!
        </h2>

        <v-container>
          <v-row justify="center">
            <v-spacer></v-spacer>
            <v-col v-for="(info, i) in stationsInfo" :key="i" cols="12" md="4">
              <InfoCard v-bind="info" />
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import InfoCard from "@/components/info/InfoCard";

export default {
  name: "InfoMain",
  components: { InfoCard },
  data: () => ({
    weatherInfo: [
      {
        title: "Ask",
        text: "You can get weather forecasts from all around the world!",
        icon: "mdi-weather-hazy",
      },
      {
        title: "Compare",
        text: "Compare various providers to look the world from many eye's points!",
        icon: "mdi-weather-windy-variant",
      },
      {
        title: "Act",
        text: "You will not be unprepared anymore!",
        icon: "mdi-weather-rainy",
      },
    ],
    stationsInfo: [
      {
        title: "Insert",
        text: "You can insert your stations into our database",
        icon: "mdi-import",
      },
      {
        title: "Query",
        text: "Then you can consult stations from all over the world",
        icon: "mdi-database-search",
      },
      {
        title: "Rate",
        text: "Then you can give feedback on stations too",
        icon: "mdi-star",
      },
    ],
  }),
};
</script>
