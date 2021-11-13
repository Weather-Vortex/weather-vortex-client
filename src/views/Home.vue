<template>
  <v-container fluid>
    <v-row>
      <v-spacer></v-spacer>
      <!-- We can set cols attribute or hide spacers with d-classes. -->
      <v-col cols="12" md="6" class="mb-4" style="z-index: 20">
        <h2 class="display-2 font-weight-bold mb-4">
          Weather Vortex
        </h2>
        <p>A project from Lirussi Igor, Tentoni Daniele, Zandoli Silvia</p>
        <p>Weather Forecast Aggregation</p>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <v-row class="bg-img" justify="space-around">
      <v-spacer></v-spacer>
      <v-col cols="12" md="6">
        <QuickForecastCard style="z-index: 20" />
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <v-row>
      <v-col cols="12">
        <AccountButtons />
      </v-col>
    </v-row>
    <!-- Functionality presentation -->
    <v-row>
      <v-col cols="12">
        <InfoMain />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(service, i) in services" :key="i" cols="12" md="4">
        <CheckStatus v-bind="service" />
      </v-col>
    </v-row>
    <CloudEffect />
  </v-container>
</template>
<style>
.bg-img {
  background-image: url("../assets/clouds_opacized.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  border-radius: 3px;
}
</style>
<script>
// @ is an alias to /src
import AccountButtons from "@/components/AccountButtons.vue";
import CloudEffect from "@/components/CloudEffect.vue";
import CheckStatus from "@/components/info/CheckStatus.vue";
import InfoMain from "@/components/info/InfoMain.vue";
import QuickForecastCard from "@/components/weather/QuickForecastCard.vue";

export default {
  name: "Home",
  components: {
    AccountButtons,
    CheckStatus,
    InfoMain,
    QuickForecastCard,
    CloudEffect,
  },
  data() {
    return {
      services: [
        {
          name: "Main Server",
          url: process.env.VUE_APP_SERVER_URL,
        },
      ],
    };
  },
};
</script>
