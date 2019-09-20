<template>
  <section id="home-page">
    <backround />
    <div class="container">
      <div class="row">
        <div class="col-md-12 d-flex justify-content-between align-items-center my-5">
          <h2>Humble Quiz</h2>
          <button v-b-modal.modal-create-room class="btn btn-primary">Create Room</button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="card text-left">
            <div class="card-header d-flex justify-content-between">
              <b>Nama Room</b>
              <b>Game Master</b>
            </div>
            <div class="card-body">
              <button class="btn btn-sm btn-primary" style="width:100%">Join</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-create-room"
      ref="modal-create-room"
      title="Create New Room"
      :hide-footer="true"
      @show="resetModal"
      @hidden="resetModal"
    >
      <form @submit.prevent="addRoom">
        <div class="form-group">
          <label for="name">Room Name</label>
          <input
            autofocus
            required
            v-model="inputName"
            type="text"
            class="form-control"
            id="name"
            placeholder="Enter Room Name"
          />
        </div>
        <button @click="hideModal" type="submit" class="btn btn-primary">Create</button>
      </form>
    </b-modal>
  </section>
</template>

<script>
import Backround from "@/components/Background";
export default {
  name: "home",
  components: {
    Backround
  },
  methods: {
    resetModal() {
      this.inputName = "";
    },
    hideModal() {
      this.$refs["modal-create-room"].hide();
    }
  }
};
</script>
