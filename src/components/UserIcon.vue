<template>
  <!-- Add menu with this tutorial: https://vuetifyjs.com/en/components/app-bars/#menu -->
  <v-menu left bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-avatar v-if="authenticated" color="primary" size="40" alt="User">
          <span class="white--text text-h6">
            {{ initials }}
          </span>
        </v-avatar>
        <v-icon v-else>mdi-account-circle</v-icon>
      </v-btn>
    </template>

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
  </v-menu>
</template>

<script>
export default {
  name: "UserIcon",
  computed: {
    authenticated: function () {
      return this.$store.getters.isAuthenticated;
    },
    initials: function () {
      return this.$store.getters.initials;
    },
    menuItems: function () {
      return this.items.filter((f) => f.logged === this.authenticated);
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
  }),
};
</script>
