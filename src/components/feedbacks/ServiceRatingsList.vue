<template>
  <v-card max-width="400" elevation="6">
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
          <v-list-item class="pa-0 ma-1">
            <v-list-item-avatar
              @click="navigateToUserPage(item.userId)"
              class="pa-0 ma-1"
            >
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-avatar
                    :color="item.color"
                    size="40"
                    class="white--text"
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ item.initials }}
                  </v-avatar>
                </template>
                <span>{{ item.initialsTooltip }}</span>
              </v-tooltip>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title @click="navigateToUserPage(item.userId)">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on">
                      {{ item.name }}
                    </span>
                  </template>
                  <span>{{ item.nameTooltip }}</span>
                </v-tooltip>
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
        console.log("Process feedback", mapped);
        // Process initials.
        const firstName = mapped?.user?.firstName?.charAt(0) ?? "D";
        const lastName = mapped?.user?.lastName?.charAt(0) ?? "E";
        const initials = `${firstName}${lastName}`;
        mapped.initials = initials;
        const deletedInitials = "Deleted";
        mapped.initialsTooltip = mapped?.user ? initials : deletedInitials;

        // Process colors.
        const colorsLength = this.colors.length;
        mapped.color = this.colors[this.genRandomIndex(colorsLength)];

        // Process fullname.
        const delitedToolip = "This user was deleted";
        const fullName = (user) => `${user?.firstName} ${user?.lastName}`;
        mapped.name = mapped?.user ? fullName(mapped?.user) : "Deleted";
        mapped.nameTooltip = mapped?.user ? mapped.name : delitedToolip;

        // Process tooltips.
        mapped.userId = mapped?.user?._id ?? "";

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
      const fixed = Number.parseFloat(avg).toFixed(2);

      return fixed;
    },
  },
  methods: {
    genRandomIndex(length) {
      return Math.ceil(Math.random() * (length - 1));
    },
    navigateToUserPage(userId) {
      /*
      Navigate to the public user page if it's set.
      If contains nothing because the user was deleted, do nothing.
      */
      if (userId) {
        const url = `/user/public/${userId}`;
        this.$router.push(url);
      }
    },
  },
};
</script>
