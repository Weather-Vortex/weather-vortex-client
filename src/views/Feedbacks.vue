<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1>Feedbacks</h1>
      </v-col>
    </v-row>
    <v-row class="my-5"> <SlideOrizontalGroup /> </v-row>
  </v-container>
</template>

<script>
import SlideOrizontalGroup from "@/components/feedbacks/SlideOrizontalGroup";
export default {
  name: "Feedbacks",
  components: { SlideOrizontalGroup },
};
</script>
