<template>
  <div>
    <section v-if="!playing && stage<1" id="waiting-page">
      <div class="container py-5">
        <div class="row">
          <div class="col-md-12">
            <div class="card text-left">
              <div class="card-header d-flex justify-content-between align-items-center">
                <b>{{room.roomName}}</b>
                <!-- <button class="btn btn-danger btn-sm">Delete Room</button> -->
              </div>
              <div class="card-body">
                <ul class="list-group">
                  <li
                    class="list-group-item d-flex justify-content-between"
                    v-for="(player,index) in room.players"
                    :key="index"
                  >
                    {{player.username}}
                    <router-link to="/home">
                      <button class="btn btn-sm btn-warning">Leave Room</button>
                    </router-link>
                  </li>
                </ul>
                <button @click="triggerPlay" class="btn btn-primary my-3" style="width:100%">Start</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Start game! -->
    <section id="game-page" v-if="stage<stageEnded && playing">
      <div class="container py-5">
        <div class="row mb-5">
          <div class="col-md-12 d-flex justify-content-center">
            <h1>Stage: {{stage}}</h1>
            <!-- <h1>10 sec</h1> -->
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 d-flex justify-content-center">
            <!-- <img src="https://via.placeholder.com/150" alt /> -->
          </div>
        </div>

        <div class="row mt-5">
          <div class="col-md-12 my-3">
            <h3>{{question[stage].content}}</h3>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-6 my-2">
                <button
                  class="btn btn-primary"
                  style="width:100%"
                  @click="answer(question[stage].choices[0])"
                >{{question[stage].choices[0]}}</button>
              </div>
              <div class="col-md-6 my-2">
                <button
                  class="btn btn-primary"
                  style="width:100%"
                  @click="answer(question[stage].choices[1])"
                >{{question[stage].choices[1]}}</button>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 my-2">
                <button
                  class="btn btn-primary"
                  style="width:100%"
                  @click="answer(question[stage].choices[2])"
                >{{question[stage].choices[2]}}</button>
              </div>
              <div class="col-md-6 my-2">
                <button
                  class="btn btn-primary"
                  style="width:100%"
                  @click="answer(question[stage].choices[3])"
                >{{question[stage].choices[3]}}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Result Page -->

    <section id="result-page" v-if="stage>=stageEnded">
      <backround />
      <div class="container py-5">
        <div class="row">
          <div class="col-md-12">
            <div class="card text-left">
              <div class="card-header d-flex justify-content-between align-items-center">
                <b>Nama Room</b>
                <!-- <button class="btn btn-danger btn-sm">Delete Room</button> -->
              </div>
              <div class="card-body">
                <ul class="list-group">
                  <li
                    v-for="(player,index) in room.players"
                    :key="index"
                    class="list-group-item d-flex justify-content-between"
                  >
                    <span>{{player.username}}</span>
                    <span>Score : {{player.score}}</span>
                    <router-link to="/home">
                      <button class="btn btn-sm btn-warning">Leave Room</button>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import question from "../components/question";
import firebase from "firebase/app";
import db from "../apis/firebase";
export default {
  data() {
    return {
      roomId: "",
      stageEnded: 6,
      canAnswer: true
    };
  },
  components: {
    // question
  },
  computed: {
    // getQuestions() {
    //   return this.$store.state.questionList;
    // },
    playing() {
      // console.log(playing)
      // console.log(this.room.playing)
      if (this.room) {
        return this.room.playing;
      }
    },
    room() {
      // console.log(this.$route.params.id)
      for (let room of this.$store.state.roomList) {
        if (room.id == this.$route.params.id) {
          // console.log(room)
          return room;
        }
      }
    },
    stage() {
      if (this.room) {
        return this.room.stage;
      }
    },
    question() {
      if (this.room) {
        return this.room.question;
      }
    },
    theplayer() {
      if (this.room) {
        for (let player of this.room.players) {
          if (localStorage.getItem("userId") == player.id) {
            return player.answer;
          }
        }
      }
    }
  },
  methods: {
    triggerPlay() {
      // let condition = true
      if (localStorage.userId == this.room.roomMaster.id) {
        // this.canAnswer = true;
        db.collection("rooms")
          .doc(this.$route.params.id)
          .update({
            playing: true,
            stage: firebase.firestore.FieldValue.increment(1)
          })
          .then(() => {
            console.log("sukses trigger play");
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        console.log("you are not authorized to start this game");
      }
    },
    fetchRoomData() {
      let id = this.$route.params.id;
      db.collection("rooms").doc(this.roomId);
    },
    answer(value) {
      //   console.log(value);
      let answer = value;
      let UserId = localStorage.getItem("userId");
      let score = this.question[this.stage].correctAnswer == value ? 10 : 0;
      console.log("=========");
      //   console.log(this.theplayer)
      //   console.log(this.question[this.stage].correctAnswer);
      //   console.log(value);
      if (this.theplayer) {
        db.collection("rooms")
          .doc(this.$route.params.id)
          .get()
          .then(data => {
            let obj = { ...data.data() };
            obj.players = obj.players.map(el => {
              if (el.id == UserId) {
                el.score += score;
                el.answer = false;
              }
              return el;
            });
            //   console.log(obj);
            return db
              .collection("rooms")
              .doc(this.$route.params.id)
              .set(obj);
          })
          .then(data => {
            console.log("sukses update data");
            // this.canAnswer = false;
          })
          .catch(err => {
            console.log("gagal jing");
          });
      } else {
        console.log("you already answer this question");
      }
    }
  },
  watch: {
    stage(newval, oldvalue) {
      //   console.log(this.playing);
      if (localStorage.userId == this.room.roomMaster.id) {
        if (newval <= 5 && this.playing) {
          //   this.playing()
          setTimeout(() => {
            let userId = localStorage.getItem("userId");
            db.collection("rooms")
              .doc(this.$route.params.id)
              .get()
              .then(data => {
                let obj = { ...data.data() };
                obj.players = obj.players.map(el => {
                  //   if (el.id == userId) {
                  el.answer = true;
                  //   }
                  return el;
                });
                return db
                  .collection("rooms")
                  .doc(this.$route.params.id)
                  .set(obj);
              })
              .then(data => {
                console.log("berhasil reset answer jadi true");
              })
              .catch(err => {
                console.log(err);
              });
            db.collection("rooms")
              .doc(this.$route.params.id)
              .update({
                stage: firebase.firestore.FieldValue.increment(1)
              });
            //   this.canAnswer = true;
          }, 10000);
        } else {
          console.log("game belum berjalan");
        }
      }
    }
  }
};
</script>

<style>
</style>
