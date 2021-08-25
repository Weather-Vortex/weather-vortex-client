<template>
  <v-container fluid>
    <v-row :align="center" :justify="center">
      <v-spacer class="d-none d-md-block"></v-spacer>
      <v-col cols="12" sm="12" md="6" xs="6">
        <v-img src="../assets/404.png" contain max-height="483" max-width="750">
        </v-img>
      </v-col>
      <v-spacer class="d-none d-md-block"></v-spacer>
    </v-row>
    <v-row :justify="center">
      <v-col>
        <h1>This is 404 Error</h1>
        This page is missing, maybe it's disappeared after a storm, or probably
        you are lost...
        <br />
        <br />
        <v-btn
          class="rounded-xl"
          color="primary"
          x-large
          dark
          @click="goHome()"
        >
          <b>Go back <br />to a safe place</b>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Error404",
  data: () => ({}),
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>
