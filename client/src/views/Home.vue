<template>
  <section id="home-page">
    <background />
    <div class="container">
      <div class="row">
        <div class="col-md-12 d-flex justify-content-between align-items-center my-5">
          <h2>Humble Quiz</h2>
          <button v-b-modal.modal-create-room class="btn btn-primary">Create Room</button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6" v-for="room in rooms" :key="room.id">
          <div class="card text-left">
            <div class="card-header d-flex justify-content-between">
              <b>Room's Name: {{room.roomName}}</b>
              <b>Game Master: {{room.roomMaster.username}}</b>
            </div>
            <div class="card-body">
              <button
                v-b-modal.modal-join
                @click="currentRoomId=room.id"
                class="btn btn-sm btn-primary"
                style="width:100%"
              >Join</button>
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
      <form @submit.prevent="createRoom">
        <div class="form-group">
          <label for="name">Room Name</label>
          <input
            autofocus
            required
            v-model="formCreateRoom.roomName"
            type="text"
            class="form-control"
            id="name"
            placeholder="Enter Room Name"
          />
        </div>
        <div class="form-group">
          <label for="name">Game Master's Name</label>
          <input
            required
            v-model="formCreateRoom.roomMaster"
            type="text"
            class="form-control"
            id="name"
            placeholder="Enter Your Name"
          />
        </div>
        <button @click="hideModal" type="submit" class="btn btn-primary">Create</button>
      </form>
    </b-modal>

    <b-modal id="modal-join">
      <b-form @submit.prevent="joinRoom" id="joinRoom">
        <b-form-group label="Enter Your Name: " label-for="title">
          <b-form-input
            type="text"
            v-model="guest"
            placeholder="Enter Your Name"
            id="title"
            required
          ></b-form-input>
        </b-form-group>
      </b-form>
      <div slot="modal-footer">
        <b-button variant="primary" type="submit" form="joinRoom" class="btn btn-blue-grey">Confirm</b-button>
      </div>
    </b-modal>
  </section>
</template>

<script>
import Background from "@/components/Background";
export default {
  name: "home",
  data() {
    return {
      formCreateRoom: {
        roomMaster: "",
        roomName: ""
      },
      guest: "",
      currentRoomId: ""
    };
  },
  components: {
    Background
  },
  methods: {
    resetModal() {
      this.inputName = "";
    },
    hideModal() {
      this.$refs["modal-create-room"].hide();
    },
    createRoom() {
      let payload = {
        roomName: this.formCreateRoom.roomName,
        roomMaster: this.formCreateRoom.roomMaster
      };
      this.$store
        .dispatch("createRoom", payload)
        .then(() => {
          this.$bvModal.hide("modal-task");
        })
        .catch(err => {
          console.log(err);
        });
    },

    joinRoom() {
      let payload = {
        roomId: this.currentRoomId,
        guest: this.guest
      };
      this.$store.dispatch("joinRoom", payload);
      // console.log(id)
    }
  },
  computed: {
    rooms() {
      return this.$store.state.roomList;
    }
  }
};
</script>