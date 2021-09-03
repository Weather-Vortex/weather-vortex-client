<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" block x-large v-bind="attrs" v-on="on">
        <b>Give Feedback</b>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Please Rate this Service</span>
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
                  <v-icon left v-show="!expand">
                    mdi-chevron-down
                  </v-icon>
                  <v-icon left v-show="expand">
                    mdi-chevron-up
                  </v-icon>
                  Altro
                </v-btn>
              </v-col>

              <v-expand-transition>
                <v-row v-show="expand">
                  <v-col cols="12" sm="12" class="pt-0">
                    <v-select
                      v-model="field"
                      :items="[
                        'Weather',
                        'Temperature',
                        'TempMin',
                        'TempMax',
                        'Pressure',
                        'Humidity',
                        'Clouds',
                        'Rain',
                      ]"
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
                        :max="
                          new Date(
                            Date.now() - new Date().getTimezoneOffset() * 60000
                          )
                            .toISOString()
                            .substr(0, 10)
                        "
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
                      :value="value"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-expand-transition>
            </v-form>
          </v-row>
        </v-container>
        <small v-show="expand">*optional</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" outlined text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="green" dark @click="submitFeedback()">
          Send
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data: () => ({
    rating: "",
    field: "",
    description: "",
    valid: true,
    dialog: false,
    activePicker: null,
    date: null,
    menu: false,
    rules: [(v) => v.length <= 100 || "Max 100 characters"],
    expand: false,
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
      //console.log("FORM: ", this.description);
      //this.$refs.form.validate();
      const server = process.env.VUE_APP_SERVER_URL;
      let url = `${server}/feedbacks/`;
      let content = {
        rating: this.rating,
        provider: this.provider,
        //user: this.user,
        forecastDate: this.date,
        fields: this.field,
        description: this.description,
      };
      this.$http
        .post(url, content, { withCredentials: true })
        .then((response) => {
          console.log("Response.data" + response.body.feedback.rating);
          if (response.body.feedback) {
            this.$alert("Feedback added correctly.", "Edit", "success").then(
              () => {
                //this.rating = response.body.feedback.rating;
                this.dialog = false; // Hide this edit dialog.
              }
            );
            //this.dialog = false;
          }
        })
        .catch((error) => {
          console.error(error.data);
        });
    },
  },
};
</script>
