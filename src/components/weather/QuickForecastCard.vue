<template>
  <v-card class="mx-auto" max-width="600" elevation="2">
    <v-card-title>Quick Weather Forecast</v-card-title>
    <v-card-text>
      <h3 class="font-weight-bold">
        Ask for Weather Forecast quickly using this form. Input your location
        and click on the FORECAST button.
      </h3>
    </v-card-text>
    <v-card-actions>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              id="quick-forecast-text-field"
              full-width
              label="Locality"
              :loading="isLoading"
              placeholder="Locality"
              single-line
              type="text"
              v-model="message"
              @click:append="navigate"
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
            <v-btn
              color="success"
              id="quick-forecast-search-button"
              text
              @click="navigate"
              >Forecast!</v-btn
            ><v-spacer></v-spacer>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "QuickForecastCard",

  data: () => ({
    message: null,
    loading: false,

  }),
  computed: {
    isLoading() {
      return this.loading === true;
    },
  },

  methods: {

    getPosition: function () {
      navigator.geolocation.getCurrentPosition(this.showPosition, this.error);
    },
    showPosition: function (position) {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
      this.message = "{" + this.lat + "," + this.lon + "}";
    },
    error: function (error) {
      if(error.code == error.PERMISSION_DENIED){
      this.$alert("You have to turn on the permission to access your location!");
      }
      else{
        this.$alert("Geolocation error")
      }
    },
   

    navigate() {
      this.loading = true;
      const locality = this.message;
      try {
        this.$router.push({ name: "LocalityForecasts", params: { locality } });
      } catch (error) {
        console.error("Router navigation error:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
