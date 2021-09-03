<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" class="mx-md-4 py-4" color="white" elevation="4">
        <h2 class="display-2 font-weight-bold mb-4">About</h2>
        <p>
          Weather Vortex is a project that aims to provide the user a unique
          service to check all the weather forecasts and paragonate them.
        </p>
        <p>
          Starting from this need, this platform was created. Here it's possible
          to semplify everyday decisions that are weather-based.
        </p>
        <p>
          This can lead to a huge amount of time saved and to a better
          organization.
        </p>
        <p>
          On the other hand, the user can also customize his experience adding
          Iot device to "trust" and leave feedbacks to all the services
          available.
        </p>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <v-parallax class="my-3" height="300" dark src="../assets/clouds.jpg">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1
            class="text-h4 font-weight-thin mb-4"
            style="text-shadow: 1px 1px 2px black"
          >
            Weather Vortex <br />Comparison
          </h1>
          <h4 class="subheading" style="text-shadow: 1px 1px 2px black">
            Take the right decision, today!
          </h4>
        </v-col>
      </v-row>
    </v-parallax>

    <v-row class="timeline">
      <v-spacer></v-spacer>
      <v-col cols="12">
        <h3 class="display-1 font-weight-bold my-4">Timeline</h3>
        <Timeline />
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <v-parallax class="my-3" height="300" dark src="../assets/clouds.jpg">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1
            class="text-h4 font-weight-thin mb-4"
            style="text-shadow: 1px 1px 2px black"
          >
            Weather Vortex <br />Feedbacks
          </h1>
          <h4 class="subheading" style="text-shadow: 1px 1px 2px black">
            Choose who to trust!
          </h4>
        </v-col>
      </v-row>
    </v-parallax>

    <v-row class="meet my-3">
      <v-spacer></v-spacer>
      <v-col cols="12">
        <h3 class="display-1 font-weight-bold my-4">Meet the Team</h3>
        <MeetTeam />
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <v-parallax class="my-3" height="300" dark src="../assets/clouds.jpg">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1
            class="text-h4 font-weight-thin mb-4"
            style="text-shadow: 1px 1px 2px black"
          >
            Weather Vortex <br />Iot
          </h1>
          <h4 class="subheading" style="text-shadow: 1px 1px 2px black">
            Full customizable experience! <br />
            Add your Iot stations, choose your favourite position, get notified!
          </h4>
        </v-col>
      </v-row>
    </v-parallax>

    <v-row class="contact">
      <v-spacer></v-spacer>
      <v-col cols="12">
        <h3 class="display-1 font-weight-bold my-4" id="contact-us">
          Contact Us
        </h3>
        <ContactUs />
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import MeetTeam from "@/components/about/MeetTeam.vue";
import ContactUs from "@/components/about/ContactUs.vue";
import Timeline from "@/components/about/Timeline.vue";

export default {
  name: "About",
  components: { MeetTeam, ContactUs, Timeline },
  data: () => ({}),
};
</script>
