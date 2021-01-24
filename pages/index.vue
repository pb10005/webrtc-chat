<template>
  <div>
    <v-app-bar app></v-app-bar>
    <v-subheader>Group meeting</v-subheader>
    <v-text-field label="Room Name" v-model="inputId"></v-text-field>
    <v-btn @click="join">Join Room</v-btn>
    <v-bottom-navigation v-model="value" app>
      <v-btn value="recent">
        <span>Recent</span>

        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn value="favorites">
        <span>Favorites</span>

        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn value="nearby">
        <span>Nearby</span>

        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputId: "",
    };
  },
  methods: {
    join() {
      this.$router.push(`/room?roomId=${this.inputId}`);
    },
  },
};
</script>
<style>
#cameraView {
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg); /* Safari and Chrome */
  -moz-transform: rotateY(180deg); /* Firefox */
}
</style>
