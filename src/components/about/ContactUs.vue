<template>
  <v-container fluid>
    <v-row justify="center" align="center" class="row mb-4">
      <v-col cols="12" sm="8" md="4" xs="4" class="text-center">
        <v-img
          src="@/assets/vortex.png"
          alt="Weather Vortex logo"
          contain
          height="100"
        ></v-img>
        <p class="font-italic">Please feel free to send us an email:</p>

        <v-form ref="form" class="mx-2" v-model="valid" lazy-validation>
          <v-row>
            <v-col class="my-0 py-0" cols="12">
              <v-text-field
                tabindex="1"
                outlined
                v-model="email"
                :rules="emailRules"
                label="Your Email"
                prepend-inner-icon="mdi-email"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="my-0 py-0" cols="12">
              <v-select
                tabindex="2"
                v-model="select"
                :items="items"
                outlined
                :rules="[(v) => !!v || 'Email Type is required']"
                label="Type"
                required
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="my-0 py-0" cols="12">
              <v-textarea
                tabindex="3"
                auto-grow
                outlined
                v-model="text"
                :rules="textRules"
                label="Your text"
                required
                rows="4"
                row-height="30"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-btn
            tabindex="4"
            class=" my-4"
            color="primary"
            x-large
            block
            @click="submitForm"
          >
            <v-icon class="mb-1 mr-2"> mdi-email-send </v-icon>

            <b>Send</b>
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "MeetTeam",
  data: () => ({
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) =>
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "E-mail must be valid",
    ],
    text: "",
    textRules: [(v) => !!v || "Email Text is required"],
    select: null,
    items: ["Question", "Bug", "Enhancement", "Congrats"],
  }),
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        const server = process.env.VUE_APP_SERVER_URL;
        let url = `${server}/users/contact`;
        this.$http
          .post(url, {
            email: this.email,
            select: this.select,
            text: this.text,
          })
          .then((response) => {
            //Submitted
            console.log("Ce la fai form?", response);
            this.$alert("The form is being submitted!", "Success", "success");
          })
          .catch((error) => {
            const title = "<strong>Submission</strong>&nbsp;error";

            this.$alert(
              "Error during the submission of the form",
              title,
              "error"
            ); // or here
            console.log(error);
          });
      }
    },
  },
};
</script>
