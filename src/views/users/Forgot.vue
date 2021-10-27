<template>
  <v-container fluid>
    <v-row justify="center" align="center" class="row">
      <v-col cols="12" sm="8" md="4" xs="4" class="text-center">
        <v-img
          src="@/assets/vortex.png"
          alt="Weather Vortex logo"
          contain
          height="200"
        ></v-img>
        <p class="font-italic">
          Please insert your email here and you will receive an email to change
          your password
        </p>

        <v-form ref="form" class="mx-2" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field
                tabindex="1"
                v-model="email"
                :rules="emailRules"
                label="Email"
                prepend-inner-icon="mdi-email"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-btn
            tabindex="3"
            color="primary"
            x-large
            block
            @click="submitReset"
          >
            <b>Send Email</b>
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "EmailReset",
  data: () => ({
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) =>
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "E-mail must be valid",
    ],
  }),
  methods: {
    submitReset() {
      if (this.$refs.form.validate()) {
        const server = process.env.VUE_APP_SERVER_URL;
        let url = `${server}/auth/forgotPassword`;
        this.$http
          .put(url, { email: this.email })
          .then(() => {
            this.$alert("Go to your mail inbox!", "Email sent", "success");
            this.$router.push("/user/reset");
          })
          .catch((error) => {
            console.error(error);
            this.$alert(
              "The email isn't registered in our databases",
              "Incorrent Email",
              "error"
            );
          });
      }
    },
  },
};
</script>
