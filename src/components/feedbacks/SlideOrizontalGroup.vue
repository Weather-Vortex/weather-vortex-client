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
    <!--<v-slide-group v-model="model" class="pa-2" center-active show-arrows>
      <v-slide-item
        height="500"
        v-for="ser in providers"
        :key="ser._id"
        v-slot="{ active, toggle }"
      >
        <v-card
          :color="active ? 'primary' : 'grey lighten-1'"
          class="ma-1 pa-1"
          @click="toggle"
        >
          <ServiceRatingsList :title="ser" />

          <LeaveFeedbackDialog :provider="ser" />
        </v-card>
      </v-slide-item>
    </v-slide-group>-->
    <template>
      <vue-horizontal>
        <section v-for="ser in providers" :key="ser._id">
          <ServiceRatingsList :title="ser" />

          <LeaveFeedbackDialog :provider="ser" />
        </section>
      </vue-horizontal>
    </template>
  </v-sheet>
</template>
<script>
import LeaveFeedbackDialog from "@/components/feedbacks/LeaveFeedbackDialog";
import ServiceRatingsList from "@/components/feedbacks/ServiceRatingsList";
import VueHorizontal from "vue-horizontal";
export default {
  components: {
    LeaveFeedbackDialog,
    ServiceRatingsList,
    VueHorizontal,
  },
  created() {
    this.loadFeedbacks();
  },
  data: () => ({
    model: null,
    providers: [],
    searchContent: null,
  }),
  methods: {
    loadFeedbacks() {
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
    searchMethod() {
      const elem = this.providers.find((elem) =>
        elem.name.includes(this.searchContent)
      );
      console.log("Found: ", elem);
      this.model = this.providers.indexOf(elem);
    },
    clearMessage() {
      this.searchContent = "";
    },
  },
};
</script>
