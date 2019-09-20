<template>
  <div class="container">
    <h1>masuk ke game room</h1>
    <button @click="triggerPlay" class="btn btn-primary">Let's Play</button>
    <h1 v-if="stage>=stageEnded">Selesai gamenya</h1>
    <h2 v-if="playing">{{stage}}</h2>
    <div v-if="stage>=stageEnded">
      <div v-for="(player,index) in room.players" :key="index">
        <h2>{{player.username}}</h2>
        <h2>{{player.score}}</h2>
      </div>
    </div>
    <div v-if="stage<stageEnded && playing" class="card">
      <div class="card-body">
        <p class="card-text">{{question[stage].content}}</p>
      </div>
      <div class="card-footer">
        <div class="row mb-4">
          <div
            v-for="(choice,index) in question[stage].choices"
            :key="index"
            :choice="choice"
            class="col-3"
          >
            <button class="btn btn-primary" @click="answer(choice)">{{choice}}</button>
          </div>
        </div>
      </div>
    </div>
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
      stageEnded: 4,
      canAnswer: false
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
    }
  },
  methods: {
    triggerPlay() {
      // let condition = true
      if (localStorage.userId == this.room.roomMaster.id) {
        this.canAnswer = true;
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
      }
      else {
          console.log("you are not authorized to start this game")
      }
    },
    fetchRoomData() {
      let id = this.$route.params.id;
      db.collection("rooms").doc(this.roomId);
    },
    answer(value) {
      //   console.log(value);
      let answer = value;
      let UserId = localStorage.getItem("userId")
      let score = this.question[this.stage].correctAnswer == value ? 10 : 0;
      console.log("=========");
      console.log(this.question[this.stage].correctAnswer);
      console.log(value);
      if (this.canAnswer&&score!==0) {
        db.collection("rooms")
          .doc(this.$route.params.id)
          .get()
          .then(data => {
            let obj = { ...data.data() };
            obj.players = obj.players.map(el => {
              if (el.id == UserId) {
                el.score += score;
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
            this.canAnswer = false;
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
    stage(newval,oldvalue) {
      console.log(this.playing);
      if (localStorage.userId==this.room.roomMaster.id){
          if (newval <= 3 && this.playing) {
            //   this.playing()
    
            setTimeout(() => {
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
      if (newval-oldvalue){
          this.canAnswer = true;
      }
    //   console.log(this.canAnswer)
    }
  }
};
</script>

<style>
</style>
