<template>
  <v-container>
    <v-row>
      <v-spacer />
      <v-col>
        <v-card width="500" class="blue lighten-5">
          <v-img src="@/assets/lavender.jpg">
            <v-avatar size="100">
              <img alt="user" src="@/assets/user.png" />
            </v-avatar>
            <v-card-title class="white--text">
              <h3 class="font-weight-bold">
                [{{ this.initials }}] {{ this.lastName }} {{ this.firstName }}
              </h3>
            </v-card-title>
          </v-img>
        </v-card>
      </v-col>
      <v-spacer />
    </v-row>
    <v-row no-gutters>
      <v-col md="4" class="pa-md-10 mx-lg-auto">
        {{ userId }}
      </v-col>
      <v-col md="4" offset-md="4" class="pa-md-10 mx-lg-auto">
        {{ userId }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PublicProfile",
  computed: {
    initials: function () {
      if (!this.user) {
        return "";
      }

      if (this.user === null) {
        return "";
      }

      const firstName = this.user.firstName.charAt(0);
      const lastName = this.user.lastName.charAt(0);
      return `${firstName}${lastName}`;
    },
    firstName: function () {
      return this.user.firstName;
    },
    lastName: function () {
      return this.user.lastName;
    },
  },
  data: function () {
    return {
      user: null,
      userId: this.$route.params.id,
    };
  },
  methods: {
    loadUser() {
      const server = process.env.VUE_APP_SERVER_URL;
      const url = `${server}/users/${this.userId}`;
      this.$http
        .get(url)
        .then((res) => {
          console.log("Result:", res.data);
          this.user = res.data;
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    },
  },
  mounted() {
    this.loadUser();
  },
};
</script>
