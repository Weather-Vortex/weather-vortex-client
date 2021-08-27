<template
  ><v-container class="mt-12">
    <h3>Profile</h3>
    <v-row class="text-center">
      <v-col class="mb-5" cols="12">
        <v-btn icon v-bind="attrs" v-on="on" v-on:click="LoggedIn()">
          <!-- TODO: Add here user icon -->
          <v-icon>mdi-account-circle</v-icon>Refresh
        </v-btn>
        <v-list dense rounded nav>
          <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            router
            :to="item.route"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  created() {
    this.LoggedIn();
  },
  name: "UserIcon",
  computed: {
    menuItems: function() {
      return this.items.filter((f) => f.logged === this.isLogged);
    },
  },
  data: () => ({
    items: [
      {
        title: "Login",
        route: "/user/login",
        icon: "mdi-login",
        logged: false,
      },
      {
        title: "Register",
        route: "/user/register",
        icon: "mdi-account-plus",
        logged: false,
      },
      /* TODO: Show only if logged. */
      {
        title: "Account",
        route: "/user/profile",
        icon: "mdi-account",
        logged: true,
      },
      {
        title: "Logout",
        route: "/user/logout",
        icon: "mdi-logout",
        logged: true,
      },
    ],
    isLogged: false,
  }),
  methods: {
    LoggedIn() {
      if (localStorage.getItem("jwt") != null) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    },
  },
};
</script>
