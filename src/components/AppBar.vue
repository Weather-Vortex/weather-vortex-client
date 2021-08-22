<template>
  <!-- Is always placed at the top of an application with a lower priority than v-system-bar. -->
  <v-app-bar app dark>
    <v-app-bar-nav-icon @click="toggleDrawer"
      ><!-- 
          TODO: Add App Bar Nav Icon
          Add following this page tutorial: https://vuetifyjs.com/en/components/app-bars/#v-app-bar-nav-icon
          -->
    </v-app-bar-nav-icon>

    <v-spacer></v-spacer>

    <v-toolbar-title>
      Weather Vortex
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
    drawerVisible: () => this.$store.state.drawer,
  },
  methods: {
    toggleDrawer() {
      this.$store.commit("toggleDrawer");
    },
  },
};
</script>