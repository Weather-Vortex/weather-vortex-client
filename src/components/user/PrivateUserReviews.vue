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
          <v-btn class="mb-2" small fab dark color="indigo" @click="goTo()"
            ><v-icon>mdi-chevron-right</v-icon></v-btn
          >
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
        value: "providers",
      },
      { text: "Vote", value: "ratings" },
      { text: "Comment", value: "descriptions" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    reviews: [],
    editedIndex: -1,
    editedItem: {
      providers: "",
      ratings: 0,
      descriptions: "",
    },
    defaultItem: {
      providers: "",
      ratings: 0,
      descriptions: "",
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
    //populate the table
    const server = process.env.VUE_APP_SERVER_URL;
    const user = this.$store.getters.getId;
    console.log("user: " + user);
    let url = `${server}/users/${user}/feedbacks`;
    this.$http
      .get(url)
      .then((response) => {
        this.feedbacks = response.data.feedbacks;
        this.ratings = this.feedbacks.map((e) => e.rating);
        this.providers = this.feedbacks.map((e) => e.provider.name);
        this.descriptions = this.feedbacks.map((e) => e.description);
        this.id = this.feedbacks.map((e) => e._id);
        console.log("Feedbacks id are: " + this.id);
        this.reviews = this.feedbacks.map((mapped) => {
          const feedId = mapped._id;
          const providers = mapped.provider.name;
          const ratings = mapped.rating;
          const descriptions = mapped.description;
          mapped.feedId = feedId;
          mapped.providers = providers;
          mapped.ratings = ratings;
          mapped.descriptions = descriptions;
          return mapped;
        });

        console.log(
          " All ratings: " +
            this.providers +
            ", All providers: " +
            this.providers +
            ", All descriptions: " +
            this.descriptions
        );
      })
      .catch((error) => {
        console.error(error.data);
      });
    this.initialize();
  },

  methods: {
    initialize() {
      this.reviews = [
        /* {
          providers: "Tropos",
          ratings: 4,
          descriptions: "E' stato bello",
        },
        {
          providers: "ErClare",
          ratings: 1,
          descriptions: "Schifo",
        },*/
      ];
    },
    //delete a feedback
    deleteItem(item) {
      const server = process.env.VUE_APP_SERVER_URL;
      this.editedIndex = this.reviews.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
      let url = `${server}/feedbacks/${this.editedItem.feedId}`;

      this.$http
        .delete(url, { withCredentials: true })
        .then((response) => {
          this.feedbacks = response.data.feedbacks;
        })
        .catch((error) => {
          console.error(error.data);
        });
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
