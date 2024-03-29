<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="5" class="my-auto">
        <h1 class="display-1 font-weight-bold text-truncate">{{ title }}</h1>
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
        <v-btn
          v-for="item in items"
          :key="item.title"
          text
          :value="item.path"
          @click="navigate(item.path)"
        >
          <span class="hidden-xs-and-down">{{ item.description }}</span>
          <v-icon right>{{ item.icon }}</v-icon>
        </v-btn>
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
  data: function() {
    return {
      selected: "justify",
      isLoading: false,
      items: [
        {
          name: "now",
          description: "Now",
          path: "current",
          route: "Current",
          icon: "mdi-weather-hazy",
        },
        {
          name: "3days",
          description: "3 Days",
          path: "threedays",
          route: "Three Days",
          icon: "mdi-star",
        },
      ],
      loading: null,
      locality: null,
    };
  },
  methods: {
    error: function(error) {
      if (error.code == error.PERMISSION_DENIED) {
        this.$alert(
          "You have to turn on the permission to access your location!"
        );
      } else {
        this.$alert("Geolocation error");
      }
    },
    getPosition: function() {
      navigator.geolocation.getCurrentPosition(this.showPosition, this.error);
    },
    navigate(path) {
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
      this.navigateToForecast(path);
    },
    navigateToForecast: function(value) {
      this.$router
        .push(`/forecasts/${this.locality}/${value}`) // { name: value, params: { locality: this.locality } }
        .catch((failure) => {
          if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
            console.warn(
              `Navigation duplicated no problem: you wanna navigate to ${failure.to.path}, but you already are in ${failure.from.path}`
            );
          } else {
            console.error("Navigation error: ", failure);
          }
        })
        .finally(() => (this.$router.go(), (this.loading = false)));
    },
    showPosition: function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      this.locality = latitude + "," + longitude;
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
      this.navigateToForecast(value);
    },
  },
};
</script>
