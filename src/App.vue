<template>
  <v-app>
    <!-- 
      Applying the app prop automatically applies position: fixed to the layout element. If your application calls for an absolute element, you can overwrite this functionality by using the absolute prop.
    -->

    <AppBar />

    <NavigationDrawer />

    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid class="px-0">
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
    <!-- Is always placed at the bottom of an application with a lower priority than v-bottom-navigation. -->
    <Footer />
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: { AppBar, NavigationDrawer, Footer },
  data: () => ({}),
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
