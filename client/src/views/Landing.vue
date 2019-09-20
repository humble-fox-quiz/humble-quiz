<template>
  <section id="landing-page">
    <backround />
    <music />
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <h1>Humble Quiz</h1>
          <!-- <input
            autofocus
            type="text"
            class="form-control text-center my-3"
            placeholder="Enter Your Name"
          />-->
          <router-link to="/home">
            <button class="btn btn-primary px-4 mt-3">Let's Play</button>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Backround from "@/components/Background";
import Music from "../components/Music";

export default {
  name: "landing",
  components: {
    Backround,
    Music
  },
  mounted() {
    // window.addEventListener("mouseup", this.playMusic);
  },
  methods: {}
};
</script>

<style>
#backround-landing {
  position: fixed;
  width: 100%;
  width: 100vh;
  z-index: -99;
  opacity: 0.5;
}
</style>