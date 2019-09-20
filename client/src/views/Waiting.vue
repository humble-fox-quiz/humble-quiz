<template>
  <section id="waiting-page">
    <backround />
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
                <li class="list-group-item d-flex justify-content-between" v-for>
                  Player 1
                  <button class="btn btn-sm btn-warning">Leave Room</button>
                </li>
              </ul>
              <button class="btn btn-primary my-3" style="width:100%">Start</button>
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
  name: "waiting",
  components: {
    Backround
  },
  computed: {
    rooms() {
      return;
    }
  }
};
</script>

<style>
</style>