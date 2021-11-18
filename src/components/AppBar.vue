<template>
  <!-- Is always placed at the top of an application with a lower priority than v-system-bar. -->
  <v-app-bar app dark style="z-index: 99">
    <v-app-bar-nav-icon @click="toggleDrawer"
      ><!-- 
          TODO: Add App Bar Nav Icon
          Add following this page tutorial: https://vuetifyjs.com/en/components/app-bars/#v-app-bar-nav-icon
          -->
    </v-app-bar-nav-icon>

    <v-spacer></v-spacer>

    <v-toolbar-title>
      <router-link
        class="text-h4 text-decoration-none font-weight-medium white--text "
        to="/home"
      >
        Weather Vortex</router-link
      >
      <!--
          TODO: Improving following this tutorial: https://vuetifyjs.com/en/components/app-bars/#v-app-bar-title
          -->
    </v-toolbar-title>

    <!-- Fill empty space? -->
    <v-spacer></v-spacer>

    <UserIcon />
  </v-app-bar>
</template>

<script>
import UserIcon from "@/components/UserIcon";
export default {
  name: "AppBar",
  components: { UserIcon },
  data: () => ({
    collapseOnScroll: true,
  }),
  computed: {
    /* Expose drawer.visible attribute value. */
    drawerVisible: () => this.$store.getters.drawerVisible,
  },
  methods: {
    toggleDrawer() {
      this.$store.commit("toggleDrawer");
    },
  },
};
</script>
