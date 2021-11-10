<template>
  <v-card max-width="400">
    <v-card-title>
      <span class="text-h4">{{ title.name }}</span>
    </v-card-title>
    <v-card-subtitle>
      <span class="text-h6">Average Rating: {{ index }}</span>
    </v-card-subtitle>
    <v-card-text>
      <v-divider></v-divider>
      <v-virtual-scroll
        :items="feedbacks"
        height="400"
        min-width="300"
        :item-height="50"
      >
        <template v-slot:default="{ item }">
          <v-list-item router :to="item.route" class="pa-0 ma-1">
            <v-list-item-avatar class="pa-0 ma-1">
              <v-avatar :color="item.color" size="40" class="white--text">
                {{ item.initials }}
              </v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.name }}
              </v-list-item-title>
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
    </v-card-text>
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
  }),
  computed: {
    feedbacks: function () {
      return this.title.feedbacks.map((mapped) => {
        const firstName = mapped.user.firstName.charAt(0);
        const lastName = mapped.user.lastName.charAt(0);
        const initials = `${firstName}${lastName}`;
        mapped.initials = initials;
        const colorsLength = this.colors.length;
        mapped.color = this.colors[this.genRandomIndex(colorsLength)];
        mapped.name = `${firstName} ${lastName}`;
        mapped.route = `/user/public/${mapped.user._id}`;
        return mapped;
      });
    },
    index: function () {
      const num = this.title?.feedbacks?.length;
      if (!num || num < 0) {
        // If no feedbacks are provided, return 0.
        return 0;
      }

      const sum = this.title.feedbacks
        .map((m) => m.rating)
        .reduce((prev, curr) => prev + curr, 0);
      const avg = sum / num;
      return avg;
    },
  },
  methods: {
    genRandomIndex(length) {
      return Math.ceil(Math.random() * (length - 1));
    },
  },
};
</script>
