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
  name:"PrivateUserReviews",
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
        {
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
        },
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
  text-decoration:bold;
}
</style>