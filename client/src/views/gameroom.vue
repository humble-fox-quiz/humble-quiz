<template>
  <div class="container">
      <h1>masuk ke game room</h1>
      <h1 v-if="stage>=stageEnded">Selesai gamenya</h1>
      <h2>{{stage+1}}</h2>
    <div class="card">
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
      stageEnded : 4
    };
  },
  components: {
    // question
  },
  computed: {
    // getQuestions() {
    //   return this.$store.state.questionList;
    // },
    room(){
        // console.log(this.$route.params.id)
        for (let room of this.$store.state.roomList){
            if (room.id==this.$route.params.id){
                // console.log(room)
                return room
            }
        }
        
    },
    stage(){
        if (this.room){
            return this.room.stage
        }
        
    },
    question(){
        if (this.room){
            return this.room.question
        }
    }

  },
  methods: {
    fetchRoomData() {
      let id = this.$route.params.id;
      db.collection("rooms").doc(this.roomId);
    },
    answer(id){
        console.log(id)
    },
    playing(){
        setTimeout(()=>{
            // this.stage+=1
        }, 2000)
    },
    answer(value){
        console.log(value)
        let answer = value
        let UserId = "l8050WxgfWsatn4td4xh"
        db.collection("rooms").doc(this.$route.params.id)
        .get()
        .then()
    }
  },
  watch: {
      stage(newval){
          if(newval<=3){
            //   this.playing()

            setTimeout(()=>{

                db.collection("rooms")
                .doc(this.$route.params.id)
                .update({
                    stage : firebase.firestore.FieldValue.increment(1)
                })
            },10000)
          }
          else{

          }
      }
      
    
  }
  
};
</script>

<style>
</style>
