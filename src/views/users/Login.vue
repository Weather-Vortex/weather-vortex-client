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
        <p class="font-italic">Please complete this form to login</p>

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
          <v-row>
            <v-col cols="12">
              <v-text-field
                tabindex="2"
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

          <v-btn tabindex="3" color="primary" x-large block @click="submitForm">
            <b>Log In</b>
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
    passwordRules: [(v) => !!v || "Password is required"],
  }),
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        const server = process.env.VUE_APP_SERVER_URL;
        let url = `${server}/auth/login`;
        this.$http
          .post(
            url,
            {
              email: this.email,
              password: this.password,
            },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            this.$emit("loggedIn");
            this.$store.commit("login", response.data.user);
            this.$alert({
              message: "You are authenticated",
              type: "success",
            }).then(() => {
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl);
              } else {
                // una volta loggato va alla home
                this.$router.push("/");
              }
            });
          })
          .catch((error) => {
            if (error.response) {
              switch (error.response.status) {
                case 401:
                  this.$alert({ text: "Password wrong!", type: "error" }); // or here
                  break;
                case 500:
                  this.$alert({ text: "Email not found", type: "error" }); // or here
                  break;
                //da descommentare riga nel server login->isVerified e mettergli 403 come errore codice
                case 403:
                  this.$alert({
                    message: "You are not verified, check your email box!",
                    type: "error",
                  });
                  break;
                default:
                  this.$alert({
                    message: "Unknown error, contact the support.",
                    type: "error",
                  });
                  console.log("some other error"); // end up here all the time
                  break;
              }
            } else if (error.request) {
              this.$fire({
                title: "<strong>Login</strong>&nbsp;error",
                text: `Server had response with an error: ${error.message}. You could retry the login or contact the support from the about page.`,
                footer:
                  '<a href="https://weather-vortex.github.io/weather-vortex-client/#/about#contact-us">Contact us</a>',
                type: "error",
              });
            }

            console.log("SignInForm.authenticate error: ", error);
          });
      }
    },
  },
};
</script>
