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
      <v-spacer></v-spacer>
      <v-col>
        <v-form ref="form" lazy-validation>
          <v-text-field label="Locality"></v-text-field>
          <v-btn color="success" class="mr-4" @click="() => {}">
            Forecast!
          </v-btn>
        </v-form>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <!-- Functionality presentation -->
    <v-row>
      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">
          Weather Forecasting Aggregation!
        </h2>
        <v-row justify="center">
          <!-- Those cards are repetitives, move to a new component -->
          <v-col>
            <v-card class="mx-3" max-width="300">
              <v-card-title>
                You can get weather forecasts from all around the world!
              </v-card-title>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="mx-3" max-width="300">
              <v-card-title>
                Compare various providers to look the world from many eye's
                points!
              </v-card-title>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="mx-3" max-width="300">
              <v-card-title> You will not be unprepared anymore! </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card :loading="loading" class="mx-auto my-12" max-width="374">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-card-title>
            Server Status:&nbsp;
            <div>
              <div v-if="loading">
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </div>
              <div v-else-if="status === true">
                <!-- Server status {{ status }} -->
                <v-icon color="green" x-large>mdi-check-circle</v-icon>
              </div>
              <div v-else-if="status === false">
                <v-icon color="red" x-large>mdi-close-circle</v-icon>
              </div>
            </div>
          </v-card-title>
          <v-card-text>
            <div>
              Fetching for service info (add dynamic url)
              weather-vortex-server.herokuapp.com.
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text @click="checkStatus">
              <v-icon>mdi-refresh</v-icon>
              Retry</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png" />
      <HelloWorld msg="Welcome to Your Vue.js App" /></div
  ></v-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      loading: false,
      status: null,
    };
  },
  methods: {
    async checkStatus() {
      this.loading = true;
      const info = "http://localhost:49161/";
      try {
        const { data } = await this.$http.get(info);
        console.log(data);
        this.status = data.result === "ok";
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.checkStatus();
  },
};
</script>
