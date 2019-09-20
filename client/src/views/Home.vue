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
//   <div class="home">
//     <img alt="Vue logo" src="../assets/logo.png" />
//     <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
//     <h1>Home</h1>
//     <b-button v-b-modal.modal-task class="btn btn-blue-grey">New Room</b-button>

//     <!-- tampilan list room -->
//     <div v-for="room in rooms" :key="room.id">
//       <h1>{{room.roomName}}</h1>
//       <b-button v-b-modal.modal-join @click="currentRoomId=room.id">joinRoom</b-button>
//     </div>

//     <b-modal id="modal-join">
//       <b-form @submit.prevent="joinRoom" id="joinRoom">
//         <b-form-group label="Enter Your Name: " label-for="title">
//           <b-form-input type="text" v-model="guest" placeholder="Enter title" id="title" required></b-form-input>
//         </b-form-group>
//       </b-form>
//       <div slot="modal-footer">
//         <b-button variant="primary" type="submit" form="joinRoom" class="btn btn-blue-grey">Confirm</b-button>
//       </div>
//     </b-modal>

//     <b-modal id="modal-task">
//       <b-form @submit.prevent="createRoom" id="createTaskForm">
//         <b-form-group label="Enter Your Name: " label-for="title">
//           <b-form-input
//             type="text"
//             v-model="formCreateRoom.roomMaster"
//             placeholder="Enter title"
//             id="title"
//             required
//           ></b-form-input>
//         </b-form-group>
//         <b-form-group label="Enter Room Name " label-for="person">
//           <b-form-input
//             type="text"
//             v-model="formCreateRoom.roomName"
//             placeholder="assigned to"
//             id="person"
//           ></b-form-input>
//         </b-form-group>
//       </b-form>
//       <div slot="modal-footer">
//         <b-button
//           variant="primary"
//           type="submit"
//           form="createTaskForm"
//           class="btn btn-blue-grey"
//         >Confirm</b-button>
//       </div>
//     </b-modal>
//   </div>
// </template>

// <script>
// // @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

// export default {
//   data() {
//     return {
//       formCreateRoom: {
//         roomMaster: "",
//         roomName: ""
//       },
//       guest: "",
//       currentRoomId: ""
//     };
//   },

//   components: {
//     HelloWorld
//   },

//   computed: {
//     rooms() {
//       return this.$store.state.roomList;
//     }
//   },
//   methods: {
//     createRoom() {
//       let payload = {
//         roomName: this.formCreateRoom.roomName,
//         roomMaster: this.formCreateRoom.roomMaster
//       };
//       this.$store
//         .dispatch("createRoom", payload)
//         .then(() => {
//           this.$bvModal.hide("modal-task");
//         })
//         .catch(err => {
//           console.log(err);
//         });
//     },

//     joinRoom() {
//       let payload = {
//         roomId: this.currentRoomId,
//         guest: this.guest
//       };
//       this.$store.dispatch("joinRoom", payload);
//       // console.log(id)
//     }
//   }
//   // ,
//   // created() {
//   //   this.$store.dispatch("getRoom");
//   // }
// };
// </script>
