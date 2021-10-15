<template>
  <v-data-table
    :headers="headers"
    :items="reviews"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
</template>

<script>
export default {
  name: "PublicUserReviews",
  created() {
    const server = process.env.VUE_APP_SERVER_URL;
    console.log("Prova id utente:", this.userId);
    let url = `${server}/users/${"615dfee69aa9e20b103fc883"}/feedbacks`;
    this.$http
      .get(url)
      .then((response) => {
        this.feeds = response.data.feedbacks;
        console.log("Li stampa?" + this.feedbacks);
        this.reviews = this.feeds.map((mapped) => {
          const providers = mapped.provider.name;
          const ratings = mapped.rating;
          const descriptions = mapped.description;

          mapped.providers = providers;
          mapped.ratings = ratings;
          mapped.descriptions = descriptions;
          console.log(mapped.rating);
          console.log("mapped", mapped, "++", mapped.provider.name);
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
        //this.feedbacks = response.data.results[0].feedbacks[0].rating;
        //console.log("rating:" + this.feedbacks);
      })
      .catch((error) => {
        console.error(error.data);
      });
  },
  data() {
    return {
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
