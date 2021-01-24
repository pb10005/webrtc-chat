<template>
  <div>
    <v-app-bar app>
      <v-btn icon @click="$router.push('/')">
        <v-icon> mdi-arrow-left </v-icon>
      </v-btn></v-app-bar
    >
    <p>Your Peer ID: {{ peerId }}</p>
    <v-btn @click="startVoice">Voice</v-btn>
    <v-btn @click="startVideo">Video</v-btn>
    <v-btn @click="startDisplay">Display</v-btn>
    <div v-for="peer in peers" :key="peer.peerId">
      <video
        :id="peer.peerId"
        :peerId="peer.peerId"
        :srcObject.prop="peer.stream"
        autoplay
        playsinline
      ></video>
      <span>{{ peer.peerId }}</span>
    </div>

    <video
      id="my-video"
      :srcObject.prop="localStream"
      autoplay
      muted
      playsinline
    ></video>
  </div>
</template>
<script>
import Peer from "skyway-js";

export default {
  data() {
    return {
      localStream: null,
      peerId: "",
      inputId: "",
      peer: null,
      room: null,
      peers: [],
    };
  },
  mounted() {
    this.peer = new Peer({
      key: "abe02cb1-4e86-49d6-87f0-d682a3fd6a5f",
      debug: 3,
    });
    this.peer.on("open", (peerId) => {
      this.peerId = peerId;
    });
  },
  methods: {
    startDisplay() {
      if (!navigator.mediaDevices.getDisplayMedia) {
        alert(`Error: Your device cannot use this type of stream.`);
        return;
      }
      navigator.mediaDevices
        .getDisplayMedia()
        .then((stream) => {
          this.localStream = stream;
        })
        .then(this.joinRoom)
        .catch((err) => {
          alert(`Error: Your device cannot use this type of stream.`);
        });
    },
    startVoice() {
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          this.localStream = stream;
        })
        .then(this.joinRoom)
        .catch((err) => {
          alert(`Error: Your device cannot use this type of stream.`);
        });
    },
    startVideo() {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          this.localStream = stream;
        })
        .then(this.joinRoom)
        .catch((err) => {
          alert(`Error: Your device cannot use this type of stream.`);
        });
    },
    joinRoom() {
      const peer = this.peer;
      if (this.room) {
        this.room.replaceStream(this.localStream);
        return;
      }
      this.room = peer.joinRoom(this.$route.query.roomId, {
        mode: "mesh",
        stream: this.localStream,
      });

      this.room.once("open", () => {
        console.log("=== You joined ===\n");
      });
      this.room.on("peerJoin", (peerId) => {
        console.log(`=== ${peerId} joined ===\n`);
      });

      this.room.on("peerLeave", (peerId) => {
        this.peers = this.peers.filter((p) => p.peerId !== peerId);
      });

      this.room.on("stream", async (stream) => {
        this.peers = this.peers.filter((p) => p.peerId !== stream.peerId);
        this.peers.push({ peerId: stream.peerId, stream: stream });
      });
    },
  },
  destroyed() {
    if (this.room) this.room.close();
    if (this.peer) this.peer.destroy();
  },
};
</script>
<style>
#cameraView {
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg); /* Safari and Chrome */
  -moz-transform: rotateY(180deg); /* Firefox */
}
#my-video {
  position: fixed;
  max-width: 50vw;
  max-height: 30vh;
  right: 10px;
  bottom: 10px;
}
</style>
