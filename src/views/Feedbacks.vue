<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1>Feedbacks</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-2" cols="12">
        <SlideOrizontalGroup />
      </v-col>
    </v-row>
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
