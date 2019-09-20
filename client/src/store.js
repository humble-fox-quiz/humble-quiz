import Vue from 'vue'
import Vuex from 'vuex'
import db from "./apis/firebase"
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roomList: [],
    questionList: []

  },
  mutations: {

    GET_ROOM(state, payload) {
      state.roomList = payload
      // console.log(payload)
    },
    GET_QUESTION(state, payload) {
      state.questionList = payload
      // console.log(payload)
    }

  },
  actions: {
    createRoom({ state, commit, dispatch }, payload) {
      // console.log(payload)
      let roomMaster = payload.roomMaster
      let roomName = payload.roomName
      let roomMasterId;
      dispatch("getQuestions")
      db.collection("users")
        .add({
          username: roomMaster
        })
        .then(data => {
          roomMasterId = data.id
          // console.log(data.name)
          return db.collection("rooms")
            .add({
              roomName,
              players: [{ id: data.id, username: roomMaster, score: 0 }],
              roomMaster: { id: data.id, username: roomMaster },
              question: state.questionList,
              stage: 0
            })
        })
        .then(data => {
          router.push(`/gameroom/${data.id}`);
          localStorage.setItem('userId', roomMasterId)
          localStorage.setItem('username', roomMaster)
          // console.log("room id", data.id)
          // console.log("roomMaster", roomMaster)
          // console.log("roomMasterId", roomMasterId)

        })
        .catch(err => {
          console.log(err)
        })
    },

    getRoom({ commit, dispatch }, payload) {

      db.collection("rooms")
        .onSnapshot((querySnapshot) => {
          let listrooms = []
          querySnapshot.forEach((room) => {
            let obj = {
              id: room.id,
              ...room.data()
            }

            listrooms.push(obj)

          })
          // console.log(listrooms)

          this.commit("GET_ROOM", listrooms)
        })
    },
    joinRoom({ state, commit, dispatch }, payload) {
      console.log(payload)
      // console.log("di store")
      let userId;
      let username = payload.guest
      let roomId = payload.roomId
      db.collection("users")
        .add({
          username
        })
        .then(data => {
          userId = data.id
          localStorage.setItem('userId', userId)
          localStorage.setItem('username', username)
          return db.collection("rooms").doc(roomId)
            .get()
        })
        .then(room => {
          // console.log(room.data())
          let obj = room.data()
          obj.players.push({ id: userId, username, score: 0 })
          return db.collection("rooms").doc(roomId)
            .set(obj)
          // obj.players = listplayers
        })
        .then(() => {
          router.push(`/gameroom/${roomId}`)
          console.log("berhasil")
        })
        .catch(err => {
          // console.log("masuk ke error")
        })
    },
    getQuestions({ commit }) {
      let questionList = []
      db.collection("questions")
        .get()
        .then((questions => {
          // console.log(question)
          questions.forEach(question => {
            // console.log(question.data())
            questionList.push(question.data())
            // this.$store.commit("")
          })
          questionList = questionList.slice(0, 10)
          commit("GET_QUESTION", questionList)
        }))
        .catch(err => {
          console.log(err)
        })
    }
  }
})
