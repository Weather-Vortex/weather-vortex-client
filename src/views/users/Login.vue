<template>
    <v-container fluid class="fluid">
      <v-row justify="center" align="center" class="row">
        <v-col
          cols="12"
          sm="8"
          md="4"
          xs="4"
          class="text-center"
          style="height: 100vh"
        >
          <v-img
            src="@/assets/vortex.png"
            alt="Weather Vortex logo"
            contain
            height="200"
          ></v-img>
          <p class="font-italic">Please complete this form to login</p>

          <v-form ref="form" class="mx-2" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="Email"
                  prepend-inner-icon="mdi-email"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  :rules="passwordRules"
                  label="Password"
                  prepend-inner-icon="mdi-lock"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-btn
              class="rounded-0"
              color="#000000"
              x-large
              block
              dark
              @click="submitForm"
            >
              Log In
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
export default {
  name: "SignInForm",
  data: () => ({
    show1: false,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) =>
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "E-mail must be valid",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) =>
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) ||
        "Password must contain at least lowercase letter, one number, a special character and one uppercase letter",
    ],
  }),
  methods: {
    submitForm() {
      this.$refs.form.validate();
    },
  },
};
</script>
<style scoped>
.fluid {
  margin: 0;
  padding: 0;
}
</style>