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
    <template>
      <vue-horizontal v-model="model" class="pa-2" center-active show-arrows>
        <section height="500" v-for="ser in providers" :key="ser._id">
          <ServiceRatingsList :title="ser" />

          <LeaveFeedbackDialog :provider="ser" />
        </section>
      </vue-horizontal>
    </template>
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
  </v-sheet>
</template>
<!--<template>
  <vue-horizontal responsive>
    <section v-for="item in items" :key="item.title">
      <h3>{{ item.title }}</h3>
      <p>{{ item.content }}</p>
    </section>
  </vue-horizontal>
</template>

<script>
import VueHorizontal from "vue-horizontal";

export default {
  components: {VueHorizontal},
  data() {
    return {
      // E.g: creates 20 array items...
      items: [...Array(20).keys()].map((i) => {
        return {title: `Item ${i}`, content: `🚀 Content ${i}`};
      }),
    }
  }
}
</script>

<style scoped>
section {
  padding: 16px 24px;
  background: #f5f5f5;
}
</style> -->
<script>
import ServiceRatingsList from "@/components/feedbacks/ServiceRatingsList";
import LeaveFeedbackDialog from "@/components/feedbacks/LeaveFeedbackDialog";
import VueHorizontal from "vue-horizontal";
export default {
  components: { ServiceRatingsList, LeaveFeedbackDialog, VueHorizontal },
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
    /* providers: [...Array().keys()].map((i) => {
      return { title: `Item ${i}`, content: `🚀 Content ${i}` };
    }),*/
    providers: [],
    searchContent: null,
  }),

  methods: {
    searchMethod() {
      const elem = this.providers.find((elem) =>
        elem.name.includes(this.searchContent)
      );
      console.log("Found: ", elem);
      this.model = this.providers.indexOf(elem);
      //this.clearMessage();
    },
    clearMessage() {
      this.searchContent = "";
    },
  },
};
</script>
<style scoped>
section {
  padding: 16px 24px;
  background: #f5f5f5;
}
</style>
