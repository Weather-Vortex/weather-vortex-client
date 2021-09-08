<template>
  <v-data-table
    :headers="headers"
    :items="reviews"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>My feedbacks</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <template>
          <v-btn color="primary" dark class="mb-2" @click="goTo()">
            Go to feedbacks page
          </v-btn>
        </template>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon @click="deleteItem(item)">
        mdi-delete
      </v-icon>
      <v-icon @click="goTo()">
        mdi-chevron-right
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Provider",
        align: "start",
        sortable: true,
        value: "name",
      },
      { text: "Vote", value: "rating" },
      { text: "Comment", value: "description" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    reviews: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      rating: 0,
      description: "",
    },
    defaultItem: {
      name: "",
      rating: 0,
      description: "",
    },
  }),
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.reviews = [
        {
          name: "Tropos",
          rating: 4,
          description: "E' stato bello",
        },
        {
          name: "ErClare",
          rating: 1,
          description: "Schifo",
        },
      ];
    },

    deleteItem(item) {
      this.editedIndex = this.reviews.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.reviews.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    goTo() {
      this.$router.push("/feedbacks/");
    },
  },
};
</script>
