<template>
  <!-- Add menu with this tutorial: https://vuetifyjs.com/en/components/app-bars/#menu -->
  <v-menu left bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on" v-on:click="LoggedIn()">
        <!-- TODO: Add here user icon -->
        <v-avatar
          v-if="isLogged"
          color="primary"
          size="36"
          src="@/assets/user.png"
          alt="User"
        ></v-avatar>
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
  created() {},
  methods: {
    /* getNameIcon() {
      let firstName = this.$cookies.get("firstName");
      let lastName = this.$cookies.get("lastName");
      return firstName.charAt(0) + lastName.charAt(0);
    },*/
    LoggedIn() {
      if (this.$cookies.get("auth")) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    },
  },
};
</script>
