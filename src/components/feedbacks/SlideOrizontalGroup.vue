<template>
  <v-sheet elevation="5" max-width="95%">
    <v-text-field
      v-model="searchContent"
      :append-icon="'mdi-magnify'"
      @click:append="searchMethod"
      @change="searchMethod"
      label="Search"
      single-line
      outlined
      class="ma-4"
      clearable
      clear-icon="mdi-close-circle"
    ></v-text-field>
    <v-slide-group v-model="model" class="pa-2" center-active show-arrows>
      <v-slide-item
        height="500"
        v-for="ser in services"
        :key="ser"
        v-slot="{ active, toggle }"
      >
        <v-card
          :color="active ? 'primary' : 'grey lighten-1'"
          class="ma-1 pa-1"
          @click="toggle"
        >
          <ServiceRatingsList :title="ser" />
          <v-btn color="primary" block x-large>
            <b>Give Feedback</b>
          </v-btn>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>
<script>
import ServiceRatingsList from "@/components/feedbacks/ServiceRatingsList";
export default {
  components: { ServiceRatingsList },
  data: () => ({
    model: null,
    services: [
      "OpenWeather",
      "DarkSky",
      "Throposphere",
      "Cesena Centro IoT",
      "Cesena Barriera IoT",
      "Cesena Università IoT",
      "Bologna Stazione-1",
      "Bologna Università-1",
      "Centralina di Ciccio",
      "Rimini-Iot",
    ],
  }),
  methods: {
    searchMethod() {
      const elem = this.services.find((elem) =>
        elem.includes(this.searchContent)
      );
      console.log("Found: ", elem);
      this.model = this.services.indexOf(elem);
      //this.clearMessage();
    },
    clearMessage() {
      this.searchContent = "";
    },
  },
};
</script>
