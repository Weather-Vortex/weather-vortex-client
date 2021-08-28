<template>
  <v-card class="mx-auto" max-width="500">
    <h1>Service Name</h1>
    <v-list>
      <v-list-item-group v-model="model">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :disabled="item.disabled"
          class="d-flex"
        >
          <UserIcon />

          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
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
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
import UserIcon from "@/components/UserIcon";
export default {
  components: { UserIcon },
  data: () => ({
    items: [
      {
        text: "Name 1",
        rating: 3,
      },
      {
        text: "Name 2",
        rating: 5,
      },
      {
        text: "Name 3",
        rating: 2,
      },
    ],
    model: 0,
  }),
};
</script>
