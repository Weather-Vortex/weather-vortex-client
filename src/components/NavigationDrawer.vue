<template>
  <!-- Can be placed on the left or right side of an application and can be configured to sit next to or below v-app-bar. -->
  <v-navigation-drawer app v-model="drawerVisible" absolute temporary clipped>
    <!-- -->
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
  </v-navigation-drawer>
</template>

<script>
import store from "@/state/";

export default {
  name: "NavigationDrawer",
  data() {
    return {
      items: [
        { title: "Home", route: "/home", icon: "mdi-view-dashboard" },
        { title: "Forecasts", route: "/forecasts", icon: "mdi-view-dashboard" },
        { title: "Feedbacks", route: "/feedbacks", icon: "mdi-view-dashboard" },
        { title: "About", route: "/about", icon: "mdi-forum" },
      ],
    };
  },
  computed: {
    drawerVisible: {
      /* Expose drawer.visible attribute value. */
      get: () => store.state.drawer,
      set: (newValue) => store.commit("setDrawerVisibility", newValue),
    },
  },
  methods: {
    toggleDrawer: () => this.$store.commit("toggleDrawer"),
  },
};
</script>