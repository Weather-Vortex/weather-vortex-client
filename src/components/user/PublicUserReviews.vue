<template>
  <v-data-table
    :headers="headers"
    :items="reviews"
    :items-per-page="5"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Feedbacks</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "PublicUserReviews",
  created() {
    const server = process.env.VUE_APP_SERVER_URL;
    console.log("Prova id utente:", this.userId);
    let url = `${server}/users/${this.userId}/feedbacks`;
    this.$http
      .get(url)
      .then((response) => {
        this.feeds = response.data.feedbacks;
        this.reviews = this.feeds.map((mapped) => {
          const providers = mapped.provider.name;
          const ratings = mapped.rating;
          const descriptions = mapped.description;

          mapped.providers = providers;
          mapped.ratings = ratings;
          mapped.descriptions = descriptions;
          /*console.log(mapped.rating);
          console.log("mapped", mapped, "++", mapped.provider.name);*/
          return mapped;
        });
      })
      .catch((error) => {
        console.error(error.data);
      });
  },
  data() {
    return {
      userId: this.$route.params.id,
      headers: [
        {
          text: "Provider",
          align: "start",
          sortable: true,
          value: "providers",
        },
        { text: "Vote", value: "ratings" },
        { text: "Comment", value: "descriptions" },
      ],
      reviews: [],
    };
  },
};
</script>

<style>
tbody tr:nth-of-type(even) {
  background-color: rgb(189, 230, 230);
}

tbody tr:nth-of-type(odd) {
  background-color: rgb(161, 225, 241);
}

.v-data-table-header {
  background-color: rgb(153, 166, 221);
  color: white;
}

.v-data-footer {
  background-color: rgb(250, 250, 250);
}

.theme--light.v-data-table thead tr th {
  color: white;
}
.v-data-table-header th {
  text-transform: uppercase;
  text-decoration: bold;
}
</style>
