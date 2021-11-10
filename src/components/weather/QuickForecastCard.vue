<template>
  <v-card class="mx-auto" max-width="600" elevation="2">
    <v-card-title>Quick Weather Forecast</v-card-title>
    <v-card-text>
      <h3 class="font-weight-bold">
        Ask for Weather Forecast quickly using this form. Input your location
        and click on the FORECAST button. Click on mark icon to get your current
        geolocation position.
      </h3>
    </v-card-text>
    <v-card-actions>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              id="quick-forecast-text-field"
              full-width
              label="Location"
              :loading="isLoading"
              placeholder="Insert location"
              single-line
              type="text"
              v-model="location"
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
        </v-row>
        <v-row>
          <v-col>
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="selected">
              <v-btn
                v-for="item in items"
                :key="item.title"
                :value="item.route"
              >
                <span class="hidden-xs-and-down">{{ item.description }}</span>
                <v-icon right>{{ item.icon }}</v-icon>
              </v-btn>
            </v-btn-toggle>
            <v-spacer></v-spacer>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
const alertTitle = "Forecast";
const alertType = "error";

export default {
  name: "QuickForecastCard",
  computed: {
    isLoading: function () {
      return this.loading === true;
    },
  },
  data: function () {
    return {
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
      location: null,
      loading: false,
      selected: this.$route.name,
    };
  },
  methods: {
    getPosition: function () {
      navigator.geolocation.getCurrentPosition(this.showPosition, this.error);
    },
    showPosition: function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      this.location = latitude + "," + longitude;
    },
    error: function (error) {
      if (error.code == error.PERMISSION_DENIED) {
        this.$alert(
          "You have to turn on the permission to access your location!",
          alertTitle,
          alertType
        );
      } else {
        this.$alert(
          "Unknown error accessing your location.",
          alertTitle,
          alertType
        );
      }
    },
  },
  watch: {
    selected(value) {
      // The location has to be filled.
      if (!value || value.length === 0) {
        return this.$alert(
          "You have to give a location or geolocation position",
          alertTitle,
          alertType
        );
      }

      this.loading = true;
      try {
        this.$router.push({ name: value, params: { locality: this.location } });
      } catch (error) {
        console.error("Router navigation error:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
