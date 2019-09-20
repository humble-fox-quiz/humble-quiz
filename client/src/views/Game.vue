<template>
  <section id="game-page">
    <backround />
    <div class="container py-5">
      <div class="row mb-5">
        <div class="col-md-12 d-flex justify-content-center">
          <h1>10 sec</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 d-flex justify-content-center">
          <img src="https://via.placeholder.com/150" alt />
        </div>
        <div class="col-md-12 my-3">
          <h3>Can you answer this Question ?</h3>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-md-12">
            <div class="row">
                <div class="col-md-6 my-2">
                    <button class="btn btn-primary" style="width:100%">Answer One</button>
                </div>
                <div class="col-md-6 my-2">
                    <button class="btn btn-primary" style="width:100%">Answer Two</button>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 my-2">
                    <button class="btn btn-primary" style="width:100%">Answer Three</button>
                </div>
                <div class="col-md-6 my-2">
                    <button class="btn btn-primary" style="width:100%">Answer Four</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Backround from "@/components/Background";
export default {
  name: "game",
  components: {
    Backround
  }
};
</script>

<style>
</style>