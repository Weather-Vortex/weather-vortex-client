<template>
  <v-container fluid>
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
        <p class="font-italic">
          Please complete this form to create an account
        </p>

        <v-form ref="form" class="mx-2" lazy-validation>
          <v-row>
            <v-col cols="6">
              <v-text-field
                tabindex="1"
                v-model="firstname"
                :rules="nameRules"
                label="First Name"
                required
                prepend-inner-icon="mdi-account"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                tabindex="2"
                v-model="lastname"
                :rules="nameRules"
                label="Last Name"
                prepend-inner-icon="mdi-account"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                tabindex="3"
                v-model="email"
                :rules="emailRules"
                label="Email"
                prepend-inner-icon="mdi-email"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                tabindex="4"
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                :rules="passwordRules.concat(validateLength)"
                label="Password"
                prepend-inner-icon="mdi-lock"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                tabindex="5"
                v-model="retypepassword"
                :rules="
                  passwordRules.concat(validatePassword2).concat(validateLength)
                "
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                @click:append="show2 = !show2"
                label="Re-type Password"
                prepend-inner-icon="mdi-lock"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-checkbox
            tabindex="6"
            v-model="firstcheckbox"
            :rules="[(v) => !!v || 'You must agree to continue!']"
            label="I agree with Terms and Conditions"
            required
          ></v-checkbox>

          <v-checkbox
            tabindex="7"
            v-model="seccheckbox"
            label="I want to receive WeatherVortex Emails"
            required
          ></v-checkbox>

          <v-btn tabindex="8" color="primary" x-large block @click="submitForm">
            <b>Register</b>
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "RegisterForm",
  data: () => ({
    show1: false,
    show2: false,
    firstname: "",
    lastname: "",
    nameRules: [(v) => !!v || "Name is required"],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) =>
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "E-mail must be valid",
    ],

    password: "",
    retypepassword: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) =>
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) ||
        "Password must contain at least lowercase letter, one number, a special character and one uppercase letter",
    ],
    firstcheckbox: false,
    seccheckbox: false,
  }),

  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        const server = process.env.VUE_APP_SERVER_URL;
        let url = `${server}/auth/register`;
        this.$http
          .post(url, {
            firstName: this.firstname,
            lastName: this.lastname,
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            //E' stato creato, registered
            if (response.data.user.createdDate != null) {
              this.$emit("registered");
              this.$alert({
                message:
                  "You are registered, check your mailbox to confirm your account.",
                type: "success",
              });
            }
          })
          .catch((error) => {
            if (error.response) {
              switch (error.response.status) {
                case 500:
                  this.$alert({
                    message: "Error during registration or email already used!",
                    type: "error",
                  }); // or here
                  break;
                default:
                  console.log("some other error"); // end up here all the time
                  break;
              }
            } else if (error.request) {
              this.$fire({
                title: "<strong>Register</strong>&nbsp;error",
                text: `Server had response with an error: ${error.message}. You could retry the registration or contact the support from the about page.`,
                footer:
                  '<a href="https://weather-vortex.github.io/weather-vortex-client/#/about#contact-us">Contact us</a>',
                type: "error",
              });
            }

            console.log("SignUpForm.authenticate error: ", error);
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
