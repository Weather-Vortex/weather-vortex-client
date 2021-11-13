<template>
  <v-sheet elevation="8">
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

    <template>
      <vue-horizontal class="horizontal" :displacement="0.7" height="500">
        <section v-for="(ser, i) in providers" :key="i">
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
    clearMessage() {
      this.searchContent = "";
    },
    onFeedbackCreated(event) {
      const provider = this.providers.find((v) => v._id === event.provider._id);
      provider.feedbacks.push(event);
    },
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
  },
};
</script>
<style scoped>
.horizontal >>> .v-hl-btn-prev svg {
  background: blue;
  color: white;
  border-radius: 0;
}
.horizontal >>> .v-hl-btn-next {
  top: 0;
  bottom: 0;
  transform: translateX(0);
}
.replaced-btn {
  height: 100%;
  background: linear-gradient(to right, #ffffff00, white);
  padding-left: 48px;
  display: flex;
  align-items: center;
}
.replaced-btn > div {
  font-weight: 700;
  font-size: 15px;
  line-height: 1;
  color: black;
  padding: 8px 12px;
  background: white;
  border-radius: 3px;
  border: 1px solid black;
}
.forecast {
  background: #e1f3f3;
}
</style>
