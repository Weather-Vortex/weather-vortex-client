<template>
  <v-card class="mx-auto" max-width="234" tile>
    <a :href="ghLink">
      <v-row align="end" class="fill-height">
        <v-col align-self="start" class="pa-0" cols="12">
          <v-avatar class="profile" color="grey" size="114" tile>
            <v-img :src="ghLink + '.png'"></v-img>
          </v-avatar>
        </v-col>
        <v-col class="py-0">
          <v-list-item dark>
            <v-list-item-content class="secondary">
              <v-list-item-title class="text-h6">
                {{ name }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ description }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </a>
  </v-card>
</template>
<script>
export default {
  name: "PersonCard",
  props: {
    name: String,
    ghLink: String,
    description: String,
  },
};
</script>
