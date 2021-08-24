<template>
  <v-row align="center" justify="center" class="my-4">
    <v-spacer class="d-none d-md-block"></v-spacer>
    <v-col class="d-flex" v-for="(pers, i) in peopleTeam" :key="i">
      <PersonCard v-bind="pers" />
    </v-col>
    <v-spacer class="d-none d-md-block"></v-spacer>
  </v-row>
</template>

<script>
import PersonCard from "@/components/about/PersonCard";

export default {
  name: "MeetTeam",
  components: { PersonCard },
  data: () => ({
    peopleTeam: [
      {
        name: "Silvia Zandoli",
        ghLink: "https://github.com/silviazandoli",
        description: "Unibo Student",
      },
      {
        name: "Igor Lirussi",
        ghLink: "https://www.github.com/igor-lirussi",
        description: "Unibo Student",
      },
      {
        name: "Daniele Tentoni",
        ghLink: "https://github.com/Daniele-Tentoni",
        description: "Unibo Student",
      },
    ],
  }),
};
</script>
