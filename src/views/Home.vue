<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Weather Vortex</h1>
        <p>A project from Lirussi Igor, Tentoni Daniele, Zandoli Silvia</p>
        <p>Weather Forecast Aggregation</p>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-spacer class="d-none d-lg-block"></v-spacer>
      <v-col>
        <QuickForecastCard />
        <!--<v-form ref="form" lazy-validation>
          <v-text-field label="Locality"></v-text-field>
          <v-btn color="success" class="mr-4" @click="router.push('forecasts')">
            Forecast!
          </v-btn>
        </v-form>-->
      </v-col>
      <v-spacer class="d-none d-lg-block"></v-spacer>
    </v-row>

    <!-- Functionality presentation -->
    <InfoMain />

    <v-row>
      <v-col v-for="(service, i) in services" :key="i">
        <CheckStatus v-bind="service" />
      </v-col>
    </v-row>

    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png" />
      <HelloWorld msg="Welcome to Your Vue.js App" /></div
  ></v-container>
</template>

<script>
// @ is an alias to /src
import CheckStatus from "@/components/info/CheckStatus.vue";
import HelloWorld from "@/components/HelloWorld.vue";
import InfoMain from "@/components/info/InfoMain.vue";
import QuickForecastCard from "@/components/weather/QuickForecastCard.vue";

export default {
  name: "Home",
  components: {
    CheckStatus,
    HelloWorld,
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
