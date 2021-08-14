<template>
  <!-- Add menu with this tutorial: https://vuetifyjs.com/en/components/app-bars/#menu -->
  <v-menu left bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <!-- TODO: Add here user icon -->
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </template>

    <v-list dense rounded nav>
      <v-list-item
        v-for="item in items"
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
  data: () => ({
    items: [
      /* TODO: Show only if not logged. */
      { title: "Login", route: "/login", icon: "mdi-login" },
      { title: "Register", route: "/register", icon: "mdi-account-plus" },
      /* TODO: Show only if logged. */
      { title: "Account", route: "/account", icon: "mdi-account" },
      { title: "Logout", route: "/logout", icon: "mdi-logout" },
    ],
  }),
};
</script>