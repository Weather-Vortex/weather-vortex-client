<template>
  <v-data-table
    :headers="headers"
    :items="controlunits"
    :items-per-page="5"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>My control units</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <template>
          <v-btn class="mx-2" small fab dark color="indigo"
            ><v-icon>mdi-plus</v-icon></v-btn
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
  </v-data-table>
</template>

<script>
export default {
  name: "privateUserControlUnits",
  data() {
    return {
      headers: [
        {
          text: "Control Unit name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Position", value: "position" },
      ],
      controlunits: [
        {
          name: "Arcobaleno",
          position: "Cesena",
        },
        {
          name: "Mira il mare",
          position: "Rimini",
        },
        {
          name: "Erclair",
          position: "Venezia",
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
  text-decoration: bold;
}
</style>
