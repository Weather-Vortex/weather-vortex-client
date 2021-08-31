<template>
  <v-card class="mx-auto d-flex flex-column" min-width="150" elevation="2">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <h4 class="font-weight-bold">{{ text }}</h4>
    </v-card-text>
    <v-icon class="mt-auto mb-2">{{ icon }}</v-icon>
  </v-card>
</template>

<script>
export default {
  name: "InfoCard",
  props: {
    title: String,
    text: String,
    icon: String,
  },
};
</script>
