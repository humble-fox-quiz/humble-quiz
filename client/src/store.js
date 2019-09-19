import Vue from 'vue'
import Vuex from 'vuex'
import db from "./apis/firebase"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roomlist : []

  },
  mutations: {

    GET_ROOM(state,payload){
      state.roomlist = payload
      console.log(payload)
    }

  },
  actions: {

    createRoom({commit, dispatch}, payload){
      // console.log(payload)
      let roomMaster  = payload.roomMaster
      let roomName = payload.roomName
      let roomMasterId
      db.collection("users")
      .add({
        username : roomMaster
      })
      .then(data=>{
        roomMasterId = data.id
        // console.log(data.name)
        return db.collection("rooms")
        .add({
          roomName,
          players : [{id:data.id, username: roomMaster, score:0}],
          roomMaster : {id:data.id, username : roomMaster},
          stage : 0
        })
        console.log("berhasil menambah user")
      })
      .then(data=>{
        console.log("room id", data.id)
        console.log("roomMaster", roomMaster)
        console.log("roomMasterId", roomMasterId)
      })
      .catch(err=>{
        console.log(err)
      })
    },

  getRoom({commit, dispatch}, payload){

    db.collection("rooms")
    .onSnapshot((querySnapshot)=>{
      let listrooms = []
      querySnapshot.forEach((room)=>{
        let obj = {
          id : room.id,
          ...room.data()
        }
   
        listrooms.push(obj)
     
      })

      this.commit("GET_ROOM", listrooms)
    })
  },
  joinRoom({commit, dispatch}, payload){
    console.log(payload)
    // console.log("di store")
    let userId;
    let username = payload.guest
    let roomId = payload.roomId
    db.collection("users")
    .add({
      username
    })
    .then(data=>{
      userId = data.id
      return db.collection("rooms").doc(roomId)
      .get()
    })
    .then(room=>{
      // console.log(room.data())
      let obj = room.data()
      obj.players.push({id : userId, username, score : 0})
      return db.collection("rooms").doc(roomId)
      .set(obj)
      // obj.players = listplayers
    })
    .then(()=>{
      console.log("berhasil")
    })
    .catch(err=>{
      // console.log("masuk ke error")
    })
  }


  }
})
