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
      <v-form ref="form" lazy-validation>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                class="mx-auto"
                label="Locality"
                placeholder="Locality"
                prepend-inner-icon="mdi-map-marker"
                solo
                type="text"
                v-model="message"
                @click:append="navigate"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>

        <v-btn color="success" class="mx-2" @click="navigate">Forecast!</v-btn>
      </v-form>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "QuickForecastCard",
  data: () => ({
    message: "Hey!",
    loading: false,
  }),
  methods: {
    navigate() {
      const locality = this.message;
      this.$router.push({ name: "Forecasts", params: { locality } });
    },
  },
};
</script>