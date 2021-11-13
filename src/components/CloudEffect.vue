<template>
  <v-container>
    <v-img
      class="cloud goRight"
      contain
      max-height="150"
      max-width="250"
      src="@/assets/cloud.png"
    ></v-img>

    <v-img
      class="cloud goLeft"
      contain
      max-height="150"
      max-width="250"
      src="@/assets/cloud.png"
    ></v-img>
    <v-img
      class="cloud goRight"
      contain
      max-height="150"
      max-width="250"
      src="@/assets/cloud.png"
    ></v-img>

    <v-img
      class="cloud goLeft"
      contain
      max-height="150"
      max-width="250"
      src="@/assets/cloud.png"
    ></v-img>
  </v-container>
</template>
<style>
.cloud {
  position: absolute;
  transition: ease 5s;
  z-index: 10;
}
.goRight.cloud:hover {
  left: 100%;
}
.goLeft.cloud:hover {
  left: -50%;
}
.cloud:nth-child(1) {
  top: 80px;
  left: 5%;
}
.cloud:nth-child(2) {
  top: 290px;
  left: 15%;
}
.cloud:nth-child(3) {
  top: 170px;
  left: 75%;
}
.cloud:nth-child(4) {
  top: 340px;
  left: 85%;
}
</style>
<script>
export default {
  name: "CloudEffect",
};
</script>
