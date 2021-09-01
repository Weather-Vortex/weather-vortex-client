<template
  ><v-container v-if="!authenticated" class="mt-12">
    <h2 class="headline font-weight-bold mb-5">Profile</h2>
    <v-row class="text-center">
      <div class="mx-auto" max-width="600">
        <v-btn
          class="mx-5"
          width="200"
          v-for="item in items"
          :key="item.title"
          router
          :to="item.route"
          elevation="2"
          x-large
          v-bind="item.prop"
        >
          <v-icon class="mb-1 mr-2">{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AccountButtons",
  computed: {
    authenticated: function() {
      return this.$store.getters.isAuthenticated;
    },
  },
  data: () => ({
    items: [
      {
        title: "Login",
        route: "/user/login",
        icon: "mdi-login",
        prop: { color: "secondary", outlined: true },
      },
      {
        title: "Register",
        route: "/user/register",
        icon: "mdi-account-plus",
        prop: { color: "primary" },
      },
    ],
  }),
};
</script>
