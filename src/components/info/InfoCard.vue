<template>
  <v-card class="mx-3" elevation="2">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <h4 class="font-weight-bold">{{ text }}</h4>
      <div>
        <v-icon>{{ icon }}</v-icon>
      </div>
    </v-card-text>
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
