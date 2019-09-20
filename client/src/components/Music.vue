<template>
  <div id="background-music">
    <button class="btn btn-primary" @click="playMusic">Music</button>
  </div>
</template>

<script>
let music = new Audio(require("../assets/audio/background.ogg"));
music.loop = true;

export default {
  data() {
    return {
      isPlaying: false
    };
  },
  methods: {
    playMusic() {
        if(this.isPlaying === false) {
            music.play();
            this.isPlaying = true
        } else {
            music.pause();
            this.isPlaying = false
        }
    }
  }
};
</script>

<style>
#background-music {
  position: fixed;
  z-index: 999;
  right: 20px;
  bottom: 20px;
}
</style>