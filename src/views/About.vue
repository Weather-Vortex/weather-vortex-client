<template>
  <div class="aboutPage">
    <div class="about my-4">
      <v-row justify="center">
        <v-spacer class="d-none d-md-block"></v-spacer>
        <v-sheet class="mx-md-4 pa-4" color="white" elevation="4">
          <h1>About</h1>
          Weather Vortex is a project that aims to provide the user a unique
          service to check all the weather forecasts and paragonate them.<br />
          Starting from this need, this platform was created. Here it's possible
          to semplify everyday decisions that are weather-based- <br />
          This can lead to a huge amount of time saved and to a better
          organization <br />
          On the other hand, the user can also customize his experience adding
          Iot device to "trust" and leave feedbacks to all the services
          available.
        </v-sheet>
        <v-spacer class="d-none d-md-block"></v-spacer>
      </v-row>
    </div>

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

    <div class="timeline">
      <h1>Timeline</h1>
      <Timeline />
    </div>

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

    <div class="meet my-3">
      <h1>Meet the Team</h1>
      <MeetTeam />
    </div>

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

    <div class="contact">
      <h1 id="contact-us">Contact Us</h1>
      <ContactUs />
    </div>
  </div>
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
