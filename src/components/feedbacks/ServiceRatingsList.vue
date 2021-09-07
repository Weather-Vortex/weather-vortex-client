<template>
  <v-card class="mx-auto" max-width="500">
    <h1>{{ title.name }}</h1>
    <v-divider></v-divider>
    <v-virtual-scroll
      :items="feedbacks"
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
            <v-list-item-title>{{ item.user.firstName }}</v-list-item-title>
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
  created() {
    console.log(this.title.feedbacks);
    /*const server = process.env.VUE_APP_SERVER_URL;
    //get some feedbacks getting the name of the provider
    let url = `${server}/feedbacks/${this.title.name}`;
    this.$http
      .get(url)
      .then((response) => {
        this.providers = response.data.results;
        console.log("ID: " + this.providers);
      })
      .catch((error) => {
        console.error(error.data);
      });*/
  },
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
    /*items() {
      const namesLength = this.names.length;
      const surnamesLength = this.surnames.length;
      

      return Array.from({ length: 50 }, () => {
        const name = this.names[this.genRandomIndex(namesLength)];
        const surname = this.surnames[this.genRandomIndex(surnamesLength)];

        return {
          ,
          fullName: `${name} ${surname}`,
          initials: `${name[0]} ${surname[0]}`,
          rating: this.genRandomIndex(6),
        };
      });
    },*/
    feedbacks: function () {
      return this.title.feedbacks.map((mapped) => {
        const firstName = mapped.user.firstName.charAt(0);
        const lastName = mapped.user.lastName.charAt(0);
        const initials = `${firstName}${lastName}`;
        mapped.initials = initials;
        const colorsLength = this.colors.length;
        mapped.color = this.colors[this.genRandomIndex(colorsLength)];
        return mapped;
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
