<template>
  <v-container fluid>
    <h1 class="my-5">Feedbacks</h1>
    <v-row class="my-5"> <SlideOrizontalGroup /> </v-row>
  </v-container>
</template>

<script>
import SlideOrizontalGroup from "@/components/feedbacks/SlideOrizontalGroup";
export default {
  name: "Feedbacks",
  components: { SlideOrizontalGroup },
  data: () => ({}),
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>
