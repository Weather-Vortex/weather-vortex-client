<template>
  <v-data-table
    :headers="headers"
    :items="stations"
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
    let url = `${server}/users/${this.userId}/stations`;
    this.$http
      .get(url)
      .then((response) => {
        this.stats = response.data.stations;
        console.log("stampa stations?" + this.stats);
        this.stations = this.stats.map((mapped) => {
          console.log(mapped.url, mapped.position);
          const name = mapped.name;
          const position = mapped.position.locality;
          const url = mapped.url;

          mapped.name = name;
          mapped.position.locality = position;
          mapped.url = url;
          console.log("mapped is stations :", mapped);
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
          text: "Station Name",
          align: "start",
          sortable: true,
          value: "name",
        },
        { text: "Position", value: "position.locality" },
        { text: "Url", value: "url" },
      ],
      stations: [],
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
