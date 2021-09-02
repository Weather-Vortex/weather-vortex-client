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
          [{{ this.userInit }}] {{ this.lastName }} {{ this.firstName }}
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
            <v-list-item-title>{{ this.email }}</v-list-item-title>
            <v-list-item-subtitle>Personal Email</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo"> mdi-timetable </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ this.creationDate }}</v-list-item-title>
            <v-list-item-subtitle>Registration Date</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo"> mdi-lock </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title
              ><v-text-field
                type="password"
                v-model="password"
                disabled
              ></v-text-field
            ></v-list-item-title>
            <v-list-item-subtitle>Password</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo"> mdi-map-marker-radius </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ this.preferred }}</v-list-item-title>
            <v-list-item-subtitle>Preferred Position</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-container><EditDialog /></v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import EditDialog from "@/components/user/EditDialog";
export default {
  components: { EditDialog },
  name: "privateProfileCard",
  computed: {
    userInit: function() {
      return this.$store.getters.initials;
    },
    firstName: function() {
      if (this.profile) return this.profile.firstName;
      return "";
    },
    lastName: function() {
      if (this.profile) return this.profile.lastName;
      return "";
    },
    email: function() {
      if (this.profile) return this.profile.email;
      return "";
    },
    creationDate: function() {
      if (this.profile) return this.profile.createdDate;
      return "";
    },
    preferred: function() {
      if (this.profile) {
        if (this.profile.location) return this.profile.preferred.location;
        else return this.profile.preferred.position;
      }
      return "";
    },
  },
  data: () => ({
    password: "Password",
    toggleDisable: false,
    show2: false,
    profile: null,
  }),
  mounted() {
    this.getProfile();
  },
  methods: {
    getProfile: function() {
      const auth = this.$cookies.get("auth");
      if (!auth) {
        this.$router.push("/user/login");
      }
      const server = process.env.VUE_APP_SERVER_URL;
      let url = `${server}/auth/profile`;
      this.$http
        .get(url, { withCredentials: true })
        .then((response) => {
          if (response.data) {
            this.profile = response.data;
          }
        })
        .catch((error) => {
          switch (error.response.status) {
            case 400:
              this.$alert("Error!"); // or here
              break;
            case 401:
              this.$alert("Missing authentication info.").then(() =>
                this.$router.push("/user/login")
              );
              console.log(error.response);
              break;
          }
        });
    },
  },
};
</script>
