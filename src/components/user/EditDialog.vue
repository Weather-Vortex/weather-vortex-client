<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="blue" outlined dark v-bind="attrs" v-on="on">
          <v-icon> mdi-pencil </v-icon>
          Edit
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit some info</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  tabindex="1"
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  :rules="passwordRules"
                  label="Password"
                  prepend-inner-icon="mdi-lock"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  tabindex="2"
                  v-model="retypepassword"
                  :rules="passwordRules.concat(validatePassword2)"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  @click:append="show2 = !show2"
                  label="Re-type Password"
                  prepend-inner-icon="mdi-lock"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  tabindex="3"
                  label="Position Preferred"
                  prepend-inner-icon="mdi-map-marker"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    show1: false,
    show2: false,
    dialog: false,
    password: "",
    retypepassword: "",
    passwordRules: [
      (v) =>
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) ||
        "Password must contain at least lowercase letter, one number, a special character and one uppercase letter",
    ],
  }),
  methods: {
    validatePassword2(value) {
      return value === this.password || "Passwords don't match.";
    },
  },
};
</script>
