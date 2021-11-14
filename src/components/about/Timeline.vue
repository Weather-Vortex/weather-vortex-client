<template>
  <v-timeline :dense="$vuetify.breakpoint.smAndDown">
    <v-timeline-item
      v-for="(item, i) in items"
      :key="i"
      :color="item.color"
      :icon="item.icon"
      fill-dot
      class="px-9"
    >
      <span
        :class="`headline font-weight-bold `"
        slot="opposite"
        v-text="item.date"
      ></span>
      <v-card :color="item.color" dark>
        <v-card-title class="text-h6">
          {{ item.title }}
        </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12" md="10">
              {{ item.text }}
            </v-col>
            <v-col class="hidden-sm-and-down text-right" md="2">
              <v-icon size="64">
                {{ item.icon }}
              </v-icon>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>
<script>
export default {
  data: () => ({
    items: [
      {
        color: "primary darken-3",
        icon: "mdi-star",
        date: "06/2021",
        title: "Idea",
        text:
          "The idea is born. No platforms currently offer a service like this. The team investigates the possibility for for creation and the business market.",
      },
      {
        color: "primary darken-2",
        icon: "mdi-weather-night",
        date: "07/2021",
        title: "Creation",
        text:
          "The Team starts to develop the platfrom, starting from MockUps and User Stories. The design is User Centered. ",
      },
      {
        color: "primary lighten-1",
        icon: "mdi-weather-sunset",
        date: "08/2021",
        title: "Online!",
        text:
          "The platform is finally online. Starting from this point many and many refinements will be carried on to reache the result you see today.",
      },
      {
        color: "primary",
        icon: "mdi-weather-sunny",
        date: "Future?",
        title: "A new Service to the People",
        text:
          "In the future we want to keep providing our services to the customers, to develop better and better solutions to the users, and to reach new people.",
      },
    ],
  }),
};
</script>
