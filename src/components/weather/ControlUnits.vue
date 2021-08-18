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