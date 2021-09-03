<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-title class="teal primary lighten-2">
        <strong class="subheading"
          >Get connected with us on social networks:
        </strong>

        <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn color="primary darken-3" @click="$vuetify.goTo(-9999)" dark icon>
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Weather Vortex &copy; </strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>
