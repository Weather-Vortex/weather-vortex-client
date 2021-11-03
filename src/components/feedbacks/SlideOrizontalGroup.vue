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

    <!-- <template>
      <vue-horizontal class="horizontal">
        <div v-for="ser in providers" :key="ser._id">
          <ServiceRatingsList :title="ser" />

          <LeaveFeedbackDialog :provider="ser" />
        </div>
      </vue-horizontal>
    </template>-->

    <template>
      <vue-horizontal
        show-arrows
        responsive
        class="horizontal"
        :displacement="0.7"
      >
        <template v-slot:btn-next>
          <div class="replaced-btn">
            <div>MORE</div>
          </div>
        </template>

        <placeholder-component v-for="ser in providers" :key="ser._id">
          <ServiceRatingsList :title="ser" />

          <LeaveFeedbackDialog :provider="ser" />
        </placeholder-component>
      </vue-horizontal>
    </template>

    <!--<v-slide-group v-model="model" class="pa-2" center-active show-arrows>
      <v-slide-item
        height="500"
        v-for="ser in providers"
        :key="ser._id"
        v-slot="{ active, toggle }"
      >
        <v-flex xs6 xs12>
          <v-card
            :color="active ? 'primary' : 'grey lighten-1'"
            class="ma-1 pa-1"
            @click="toggle"
          >
            <ServiceRatingsList :title="ser" />

            <LeaveFeedbackDialog :provider="ser" /> </v-card
        ></v-flex>
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
import LeaveFeedbackDialog from "@/components/feedbacks/LeaveFeedbackDialog";
import ServiceRatingsList from "@/components/feedbacks/ServiceRatingsList";
export default {
  components: {
    LeaveFeedbackDialog,
    ServiceRatingsList,
  },
  created() {
    this.loadFeedbacks();
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
<style scoped>
section {
  padding: 16px 24px;
  background: #f5f5f5;
}
.horizontal >>> .v-hl-btn-prev svg {
  background: cyan;
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
</style>
