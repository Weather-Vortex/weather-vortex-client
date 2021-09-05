<template>
  <v-data-table
    :headers="headers"
    :items="reviews"
    :v-for="review in reviews"
    :key="review"
    :row="row"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
</template>

<script>
export default {
  //VUETIFY COMPONENT DATA TABLE CRUD OPERATIONS FOR DELETING REVIEWS
  name: "PrivateUserReviews",
  created() {
    const server = process.env.VUE_APP_SERVER_URL;
    let url = `${server}/feedbacks/`;
    this.$http
      .get(url)
      .then((response) => {
        this.reviews = response.data.results;
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
          sortable: false,
          value: "name",
        },
        { text: "Vote", value: "vote" },
        { text: "Comment", value: "comment" },
      ],
      reviews: [
        /*  {
          name: "OpenWeatherMap",
          vote: "5 stelle",
          comment: "wonderfu7l",
        },
        {
          name: "Arcobaleno",
          vote: "5 stelle",
          comment: "wonderfu7l",
        },
        {
          name: "Arcobaleno",
          vote: "5 stelle",
          comment: "wonderfu7l",
        },*/
      ],
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
