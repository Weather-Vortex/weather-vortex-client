<template>
  <!-- Is always placed at the top of an application with a lower priority than v-system-bar. -->
  <v-app-bar app dark>
    <v-app-bar-nav-icon @click="drawer = true"
      ><!-- 
          TODO: Add App Bar Nav Icon
          Add following this page tutorial: https://vuetifyjs.com/en/components/app-bars/#v-app-bar-nav-icon
          -->
    </v-app-bar-nav-icon>

    <v-toolbar-title>
      Weather Vortex
      <!--
          TODO: Improving following this tutorial: https://vuetifyjs.com/en/components/app-bars/#v-app-bar-title
          -->
    </v-toolbar-title>

    <!-- Fill empty space? -->
    <v-spacer></v-spacer>

    <!-- Add menu with this tutorial: https://vuetifyjs.com/en/components/app-bars/#menu -->
    <v-menu left bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <!-- TODO: Add here user icon -->
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <!-- LOGIN item -->
        <v-list-item :key="login" @click="() => {}">
          <v-list-item-icon>
            <!-- TODO: Icons here? -->
          </v-list-item-icon>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
        <!-- REGISTER item -->
        <v-list-item :key="register" @click="() => {}">
          <v-list-item-title>Register</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
  data: () => ({
    collapseOnScroll: true,
    /* Expose drawer.visible attribute value. */
    drawer: false,
  }),
};
</script>