<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <!-- We can set cols attribute or hide spacers with d-classes. -->
      <v-col cols="12" md="6" class="mb-4">
        <h2 class="display-2 font-weight-bold mb-4">Weather Vortex</h2>
        <p>A project from Lirussi Igor, Tentoni Daniele, Zandoli Silvia</p>
        <p>Weather Forecast Aggregation</p>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-spacer class="d-none d-lg-block"></v-spacer>
      <v-col>
        <QuickForecastCard />
      </v-col>
      <v-spacer class="d-none d-lg-block"></v-spacer>
    </v-row>
    <v-row>
      <v-col>
        <AccountButtons />
      </v-col>
    </v-row>
    <!-- Functionality presentation -->
    <v-row>
      <v-col>
        <InfoMain />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(service, i) in services" :key="i">
        <CheckStatus v-bind="service" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import AccountButtons from "@/components/AccountButtons.vue";
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
