<template>
  <v-card width="400" class="blue lighten-5">
    <v-img height="200px" src="@/assets/lavender.jpg">
      <v-app-bar class="mt-8" flat color="rgba(0, 0, 0, 0)">
        <v-avatar size="100">
          <img alt="user" src="@/assets/user.png" />
        </v-avatar>
      </v-app-bar>

      <v-card-title class="white--text mt-8">
        <h3 class="font-weight-bold ml-3">
          {{ profile.firstName }} {{ profile.lastName }}
        </h3>
      </v-card-title>
    </v-img>

    <v-card-text>
      <div class="font-weight-bold ml-8 mb-2">Details</div>

      <v-list two-line class="blue lighten-5">
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo"> mdi-email </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>silvia@gmail.com</v-list-item-title>
            <v-list-item-subtitle>Personal Email</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo"> mdi-lock </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <v-text-field
                type="password"
                label="Password"
                v-model="profile.password"
                :disabled="!toggleDisable"
              >
              </v-text-field>
            </v-list-item-title>
            <v-list-item-subtitle>Edit Password</v-list-item-subtitle>

            <!--Campo modificabile-> al click del bottoncino disabilitare -->
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo"> mdi-map-marker </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <v-text-field
                label="Position"
                v-model="position"
                :disabled="!toggleDisable"
                :append-icon="show2 ? 'mdi-map-marker-off' : 'mdi-map-marker'"
                @click:append="show2 = !show2"
              >
              </v-text-field>
            </v-list-item-title>
            <v-list-item-subtitle>Edit Position</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-btn
        class="ml-3"
        :color="toggleDisable ? 'primary' : 'accent'"
        @click="toggleDisable = !toggleDisable"
      >
        <v-icon> mdi-pencil </v-icon> Edit
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "privateProfileCard",

  data: () => ({
    position: "Cesena",
    password: "Password",
    toggleDisable: false,
    show2: false,
    profile: null,
  }),
  methods: {
    getProfile: function() {
      // TODO: this.$http.get("profilo personale utente")...
    },
  },
  mounted() {
    // TODO: Invocare metodo getProfile
  },
};
</script>
