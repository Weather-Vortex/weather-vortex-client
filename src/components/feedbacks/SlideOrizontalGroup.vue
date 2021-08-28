<template>
  <v-sheet elevation="5" max-width="95%">
    <v-slide-group v-model="model" class="pa-4" center-active show-arrows>
      <v-slide-item v-for="n in 10" :key="n" v-slot="{ active, toggle }">
        <v-card
          :color="active ? 'primary' : 'grey lighten-1'"
          class="ma-4"
          height="500"
          width="300"
          @click="toggle"
        >
          <v-row class="fill-height" align="center" justify="center">
            <ServiceRatingsList />
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>
<script>
import ServiceRatingsList from "@/components/feedbacks/ServiceRatingsList";
export default {
  components: { ServiceRatingsList },
  data: () => ({
    model: null,
  }),
};
</script>
