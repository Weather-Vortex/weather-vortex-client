<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-col>
        <h1>Weather Vortex</h1>
        <p>A project from Lirussi Igor, Tentoni Daniele, Zandoli Silvia</p>
        <p>Weather Forecast Aggregation</p>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-col>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="model"
            :counter="max"
            :rules="rules"
            label="Locality"
          ></v-text-field>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="forecast"
          >
            Forecast!
          </v-btn>
        </v-form>
      </v-col>
      <v-spacer></v-spacer>
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
          <v-card-title>Server Status</v-card-title>
          <v-card-text>
            <div>
              Fetching for service info (add dynamic url)
              weather-vortex-server.herokuapp.com.
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text @click="check"
              >Retry</v-btn
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
};
</script>
