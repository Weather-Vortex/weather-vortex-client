<template>
  <v-dialog
    v-model="dialog"
    max-width="600px"
    persistent
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-if="authenticated"
        color="primary"
        block
        x-large
        v-bind="attrs"
        v-on="on"
        max-width="300"
      >
        <b>Give Feedback</b>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5"
          >Please Rate <strong>{{ provider.name }}</strong> Service</span
        >
      </v-card-title>
      <v-card-text lass="pa-0">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" sm="12" md="12" class="px-0">
              <h2>Rating</h2>
            </v-col>

            <v-form ref="form" v-model="valid">
              <v-col cols="12" sm="12" md="12" class="pt-0">
                <v-rating
                  v-model="rating"
                  background-color="grey lighten-1"
                  color="primary"
                  dense
                  empty-icon="mdi-star-outline"
                  full-icon="mdi-star"
                  half-icon="mdi-star-half-full"
                  hover
                  required
                  length="5"
                  size="48"
                ></v-rating>
              </v-col>

              <v-col cols="12" sm="12" class="pt-0">
                <v-btn class="ma-2" color="primary" @click="expand = !expand">
                  <v-icon left v-if="expand"> mdi-chevron-up </v-icon>
                  <v-icon left v-else> mdi-chevron-down </v-icon>
                  More
                </v-btn>
              </v-col>

              <v-expand-transition>
                <v-row v-if="expand">
                  <v-col cols="12" sm="12" class="pt-0">
                    <v-select
                      v-model="field"
                      :items="forecastItems"
                      label="Forecast Field *"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="12" class="pt-0">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="Forecast date *"
                          prepend-icon="mdi-calendar"
                          @click:prepend="on"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                        :active-picker.sync="activePicker"
                        :max="maxForecastDate"
                        min="1990-01-01"
                        @change="save"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="12" class="pt-0">
                    <v-textarea
                      v-model="description"
                      counter
                      label="Description *"
                      :rules="rules"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row v-else>
                  <v-col cols="12" sm="12">
                    <p>Click on more to see more feedbacks options.</p>
                  </v-col>
                </v-row>
              </v-expand-transition>
            </v-form>
          </v-row>
        </v-container>
        <small v-if="expand">*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" outlined text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="green" dark @click="submitFeedback()"> Send </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["provider"],
  computed: {
    authenticated: function () {
      return this.$store.getters.isAuthenticated;
    },
    maxForecastDate: function () {
      const maxDate = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      );
      return maxDate.toISOString().substr(0, 10);
    },
  },
  data: () => ({
    expand: false, // Show more feedbacks options.
    field: "",
    forecastItems: [
      "Weather",
      "Temperature",
      "TempMin",
      "TempMax",
      "Pressure",
      "Humidity",
      "Clouds",
      "Rain",
    ],
    rating: 0,
    description: "",
    valid: true,
    dialog: false,
    activePicker: null,
    date: null,
    menu: false,
    rules: [(v) => v.length <= 100 || "Max 100 characters"],
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    submitFeedback() {
      if (!this.$refs.form.validate()) {
        this.$alert("Invalid form, check fields", "Error", "error");
        return;
      }

      //console.log("FORM: ", this.description);
      //this.$refs.form.validate();
      const server = process.env.VUE_APP_SERVER_URL;
      const url = `${server}/feedbacks/`;
      let content = {
        rating: this.rating,
        provider: this.provider._id,
        //user: this.user,
        forecastDate: this.expand ? this.date : null,
        fields: this.expand ? this.field : null,
        description: this.expand ? this.description : null,
      };
      this.$http
        .post(url, content, { withCredentials: true })
        .then((response) => {
          const { feedback } = response.data;
          if (feedback) {
            this.$alert(
              "Feedback added correctly.",
              "Creation",
              "success"
            ).then(() => {
              // Reset dialog data before quitting.
              this.activePicker = null;
              this.date = null;
              this.description = "";
              this.dialog = false;
              this.expand = false;
              this.field = null;
              this.rating = 0;

              this.$emit("feedback-created", feedback);
            });
          }
        })
        .catch((error) => {
          const title = "<strong>Add Feedback</strong>&nbsp;error";
          this.$alert(
            "Feedback not added correctly! Please give a rating",
            title,
            "error"
          ).then(() => console.error(error.data));
        });
    },
  },
};
</script>
