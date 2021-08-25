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

        <v-form ref="form" class="mx-2" v-model="valid" lazy-validation>
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

          <v-btn
            tabindex=3
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
    ],
  }),
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        this.$http
          .post("http://localhost:12000/api/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("jwt", response.data.token);
            if (localStorage.getItem("jwt") != null) {
              this.$emit("loggedIn");
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl);
              } else {
                // una volta loggato va alla home
                this.$router.push("/");
              }
            }
          })
           .catch(error => {
                switch (error.response.status) {
                    case 401:
                        this.$alert("Password wrong!")  // or here
                        break;
                      case 500:
                        this.$alert("Email not found")  // or here
                        break; 
                        //da descommentare riga nel server login->isVerified e cambiare errore con 401 a 403
                        case 403:
                          this.$alert("You are not verified, check your email box!")  
                          break
                    default:
                        console.log('some other error');  // end up here all the time
                        break;
                        
                    }
                    

            console.log('SignInForm.authenticate error: ', error);
        });

      }
    },
  },
};
</script>
