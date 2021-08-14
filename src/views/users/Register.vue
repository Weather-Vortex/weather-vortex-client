<template>
  <div class="login">
    <v-app>
      <v-main>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center" dense>
            <v-col cols="12" sm="8" md="4" lg="4">
              <v-card elevation="0">
                <v-img
                  src="@/assets/logo.png"
                  alt="Weather Vortex logo"
                  contain
                  height="200"
                ></v-img>

                <v-card-text>
                  <v-form>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          label="Enter your name"
                          name="name"
                          prepend-inner-icon="mdi-account"
                          type="text"
                          class="rounded-0"
                          ref="name"
                          v-model="name"
                          :rules="[() => !!name || 'This field is required']"
                          :error-messages="errorMessages"
                          required
                          outlined
                        >
                          ></v-text-field
                        >
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-text-field
                          label="Enter your surname"
                          name="surname"
                          prepend-inner-icon="mdi-account"
                          type="text"
                          class="rounded-0"
                          ref="surname"
                          v-model="surname"
                          :rules="[() => !!surname || 'This field is required']"
                          :error-messages="errorMessages"
                          required
                          outlined
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>

                    <v-text-field
                      label="Enter your email"
                      name="email"
                      prepend-inner-icon="mdi-email"
                      type="email"
                      class="rounded-0"
                      outlined
                    ></v-text-field>
                    <v-text-field
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show1 ? 'text' : 'password'"
                      label="Enter your password"
                      name="password"
                      hint="At least 8 characters"
                      counter
                      @click:append="show1 = !show1"
                      prepend-inner-icon="mdi-lock"
                      class="rounded-0"
                      outlined
                    ></v-text-field>
                    <v-btn class="rounded-0" color="#000000" x-large block dark
                      >Register</v-btn
                    >
                    <v-card-actions class="text--secondary">
                      <v-spacer></v-spacer>
                      <!-- <router-link :to="{ name: 'SignUp' }">Sign Up</router-link> -->
                      Already have an account?
                      <a href="#" class="pl-2" style="color: #000000"
                        >Sign In</a
                      >
                    </v-card-actions>
                  </v-form>
                </v-card-text>
                <v-card-actions class="ml-6 mr-6 text-center">
                  <p>
                    By continuing, you agree to Weather Vortex's
                    <a href="#" class="pl-2" style="color: #000000">Policy</a>
                    and
                    <a href="#" class="pl-2" style="color: #000000"
                      >Terms of Use</a
                    >
                  </p>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<style lang="css" scoped>
</style>
<script>
export default {
  //la località preferita secondo me ci sta nell'account
  data() {
    return {
      show1: false,
      password: "password",
      name: null,
      surname:null,
      formHasErrors: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
    
  },
};
</script>