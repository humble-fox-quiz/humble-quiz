<template>
  <section id="result-page">
    <backround/>
    <div class="container py-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card text-left">
            <div class="card-header d-flex justify-content-between align-items-center">
              <b>Nama Room</b>
              <button class="btn btn-danger btn-sm">Delete Room</button>
            </div>
            <div class="card-body">
              <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between">
                  <span>Player 1</span>
                  <span>Score : 90</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Player 2</span>
                  <span>Score : 80</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Player 3</span>
                  <span>Score : 70</span>
                </li>
              </ul>
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
  name: "result",
  components: {
    Backround
  }
};
</script>

<style>
</style>