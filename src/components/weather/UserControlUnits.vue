<template>
  <v-data-table
    :headers="headers"
    :items="controlunits"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Control Unit name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Position', value: 'position' },
        ],
        controlunits: [
          {
            name: 'Arcobaleno',
            position:'Cesena',
          },
          {
            name: 'Mira il mare',
            position:'Rimini',
          },
           {
            name: 'Erclair',
            position:'Venezia',
          },
          
        ],
      }
    },
  }
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
    background-color: rgb(250 ,250, 250);
  }

  .theme--light.v-data-table thead tr th {
    color: white;
  }
</style>