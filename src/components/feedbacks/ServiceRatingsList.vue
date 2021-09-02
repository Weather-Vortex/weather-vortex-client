<template>
  <v-card class="mx-auto" max-width="500">
    <h1>{{ title }}</h1>
    <v-divider></v-divider>
    <v-virtual-scroll
      :items="items"
      height="500"
      min-width="300"
      :item-height="50"
    >
      <template v-slot:default="{ item }">
        <v-list-item class="pa-0 ma-1">
          <v-list-item-avatar class="pa-0 ma-1">
            <v-avatar :color="item.color" size="40" class="white--text">
              {{ item.initials }}
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ item.fullName }}</v-list-item-title>
          </v-list-item-content>

          <v-rating
            background-color="grey"
            color="primary"
            empty-icon="mdi-star-outline"
            full-icon="mdi-star"
            half-icon="mdi-star-half-full"
            half-increments
            length="5"
            readonly
            dense
            v-model="item.rating"
          ></v-rating>
        </v-list-item>
      </template>
    </v-virtual-scroll>
  </v-card>
</template>
<script>
export default {
  components: {},
  props: ["title"],
  data: () => ({
    colors: [
      "primary",
      "primary lighten-1",
      "primary lighten-2",
      "primary darken-1",
    ],
    names: [
      "Mario",
      "Luigi",
      "Igor",
      "Matteo",
      "Silvia",
      "Sara",
      "Alessandro",
      "Daniele",
    ],
    surnames: [
      "Rossi",
      "Bianchi",
      "Verdi",
      "De Vito",
      "Allegri",
      "Neri",
      "Michelangeli",
    ],
  }),

  computed: {
    items() {
      const namesLength = this.names.length;
      const surnamesLength = this.surnames.length;
      const colorsLength = this.colors.length;

      return Array.from({ length: 50 }, () => {
        const name = this.names[this.genRandomIndex(namesLength)];
        const surname = this.surnames[this.genRandomIndex(surnamesLength)];

        return {
          color: this.colors[this.genRandomIndex(colorsLength)],
          fullName: `${name} ${surname}`,
          initials: `${name[0]} ${surname[0]}`,
          rating: this.genRandomIndex(6),
        };
      });
    },
  },
  methods: {
    genRandomIndex(length) {
      return Math.ceil(Math.random() * (length - 1));
    },
  },
};
</script>