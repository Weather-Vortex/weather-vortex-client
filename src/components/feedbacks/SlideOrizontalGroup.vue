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
        v-for="ser in providers"
        :key="ser"
        v-slot="{ active, toggle }"
      >
        <v-card
          :color="active ? 'primary' : 'grey lighten-1'"
          class="ma-1 pa-1"
          @click="toggle"
        >
          <ServiceRatingsList :title="ser.name" />

          <!--bisogna passargli l'id per creare poi un feedback-->
          <LeaveFeedbackDialog :provider="ser" />
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>
<script>
import ServiceRatingsList from "@/components/feedbacks/ServiceRatingsList";
import LeaveFeedbackDialog from "@/components/feedbacks/LeaveFeedbackDialog";
export default {
  components: { ServiceRatingsList, LeaveFeedbackDialog },
  created() {
    const server = process.env.VUE_APP_SERVER_URL;
    let url = `${server}/feedbacks/`;
    this.$http
      .get(url)
      .then((response) => {
        this.providers = response.data.results;
        console.log(this.providers);
      })
      .catch((error) => {
        console.error(error.data);
      });
  },
  data: () => ({
    model: null,
    providers: [],
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
