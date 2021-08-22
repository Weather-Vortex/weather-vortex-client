<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="5" class="my-auto">
        <h1 class="display-2 font-weight-bold">{{ title }}</h1>
      </v-col>
      <v-col cols="12" sm="7" md="4" class="ma-auto">
        <v-text-field
          full-width
          label="Locality"
          :loading="isLoading"
          placeholder="Insert locality"
          single-line
          type="text"
          v-model="locality"
          @click:append="getPosition"
        >
          <template v-slot:append>
            <v-fade-transition leave-absolute>
              <v-progress-circular
                v-if="isLoading"
                size="24"
                color="info"
                indeterminate
              ></v-progress-circular>
              <v-icon large @click="getPosition">mdi-map-marker</v-icon>
            </v-fade-transition>
          </template>
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="5" md="3" class="my-auto">
        <v-btn-toggle v-model="selected" borderless>
          <v-btn
            v-for="item in items"
            :key="item.title"
            text
            :value="item.route"
          >
            <span class="hidden-xs-and-down">{{ item.description }}</span>
            <v-icon right>{{ item.icon }}</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import VueRouter from "vue-router";
const { isNavigationFailure, NavigationFailureType } = VueRouter;
export default {
  name: "Forecasts",
  computed: {
    title() {
      return this.$route.params.locality ?? "Forecasts";
    },
  },
  data: function () {
    return {
      selected: "justify",
      isLoading: false,
      items: [
        {
          name: "now",
          description: "Now",
          route: "Current",
          icon: "mdi-weather-hazy",
        },
        {
          name: "3days",
          description: "3 Days",
          route: "Three Days",
          icon: "mdi-star",
        },
      ],
      loading: null,
      locality: null,
    };
  },
  methods: {
    getPosition() {
      console.log("Get position");
      alert("Get position");
    },
  },
  mounted() {
    this.locality = this.$route.params.locality ?? null;
    // TODO: Get from childs the selected option set.
  },
  watch: {
    selected(value) {
      // Don't navigate to empty locality.
      if (
        typeof this.locality === "undefined" ||
        this.locality === null ||
        this.locality.length === 0
      ) {
        // TODO: Show error in text box.
        return;
      }

      this.loading = true;
      this.$router
        .push({ name: value, params: { locality: this.locality } })
        .catch((failure) => {
          if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
            console.warn(
              `Navigation duplicated no problem: you wanna navigate to ${failure.to.path}, but you already are in ${failure.from.path}`
            );
          } else {
            console.error("Navigation error: ", failure);
          }
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>
