<template>
  <v-card class="mx-auto" max-width="600" elevation="2">
    <v-card-title>Quick Weather Forecast</v-card-title>
    <v-card-text>
      <h3 class="font-weight-bold">
        Ask for Weather Forecast quickly using this form. Input your location
        and click on the FORECAST button.
      </h3>
      <v-text-field
        full-width
        label="Locality"
        :loading="isLoading"
        placeholder="Locality"
        prepend-inner-icon="mdi-map-marker"
        single-line
        type="text"
        v-model="message"
        @click:append="navigate"
      >
      </v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-form ref="form" lazy-validation>
        <!--<v-container>
          <v-row>
            <v-col cols="12">-->

        <!--</v-col>
          </v-row>
        </v-container>-->
        <v-divider></v-divider>

        <v-btn color="success" class="mx-2" @click="navigate">Forecast!</v-btn>
      </v-form>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "QuickForecastCard",
  computed: {
    isLoading() {
      return this.loading === true;
    },
  },
  data: () => ({
    message: null,
    loading: false,
  }),
  methods: {
    navigate() {
      this.loading = true;
      const locality = this.message;
      try {
        this.$router.push({ name: "Forecasts", params: { locality } });
      } catch (error) {
        console.error("Router navigation error:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>