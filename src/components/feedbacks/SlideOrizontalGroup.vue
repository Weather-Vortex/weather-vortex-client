<template>
  <v-sheet elevation="5" max-width="95%">
    <v-slide-group v-model="model" class="pa-2" center-active show-arrows>
      <v-slide-item
        height="500"
        v-for="n in 8"
        :key="n"
        v-slot="{ active, toggle }"
      >
        <v-card
          :color="active ? 'primary' : 'grey lighten-1'"
          class="ma-3"
          @click="toggle"
        >
          <ServiceRatingsList />
          <v-btn color="primary" block x-large>
            <b>Give Feedback</b>
          </v-btn>
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
