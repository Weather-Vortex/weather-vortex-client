<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-spacer></v-spacer>
      <v-col cols="12" sm="8" md="4">
        <v-img
          src="@/assets/vortex.png"
          alt="Weather Vortex logo"
          contain
          height="200"
        ></v-img>
        <p class="font-italic">
          Please check the email and complete this form to change your password
        </p>

        <v-form ref="form" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field
                tabindex="3"
                v-model="token"
                :rules="nameRules"
                label="Insert here your token given in email"
                required
                prepend-inner-icon="mdi-lock-question"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                tabindex="4"
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                :rules="passwordRules.concat(validateLength)"
                label="New Password"
                prepend-inner-icon="mdi-lock"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                tabindex="5"
                v-model="retypepassword"
                :rules="
                  passwordRules.concat(validatePassword2).concat(validateLength)
                "
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                @click:append="show2 = !show2"
                label="Re-type New Password"
                prepend-inner-icon="mdi-lock"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-btn tabindex="8" color="primary" x-large block @click="submitForm">
            <b>Change your password!</b>
          </v-btn>
        </v-form>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "RegisterForm",
  data: () => ({
    show1: false,
    show2: false,
    token: "",
    nameRules: [(v) => !!v || "Token is required"],
    password: "",
    retypepassword: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) =>
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) ||
        "Password must contain at least lowercase letter, one number, a special character and one uppercase letter",
    ],
  }),

  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        const server = process.env.VUE_APP_SERVER_URL;
        let url = `${server}/auth/resetPassword`;
        this.$http
          .put(url, { resetLink: this.token, password: this.password })
          .then(() => {
            this.$alert(
              "Your password has changed!",
              "Password changed!",
              "success"
            );
            this.$router.push("/user/login");
          })
          .catch((error) => {
            console.error(error);
            this.$router.push("/user/forgot");
            this.$alert(
              "You haven't inserted the correct token. Retry!",
              "Error in changing password",
              "error"
            );
          });
      }
    },
    validatePassword2(value) {
      return value === this.password || "Passwords don't match.";
    },
    validateLength(value) {
      return value.length > 8 || "Password must have more of 8 characters";
    },
  },
};
</script>
