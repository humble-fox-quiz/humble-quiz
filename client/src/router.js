import Vue from "vue";
import Router from "vue-router";

//layout
import Landing from "./views/Landing.vue";
import Home from "./views/Home.vue";
import Waiting from "./views/Waiting.vue";
import Game from "./views/Game.vue";
import Result from "./views/Result.vue"

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "landing",
      component: Landing
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/waiting",
      name: "waiting",
      component: Waiting
    },
    {
      path: "/game",
      name: "game",
      component: Game
    },
    {
      path: "/result",
      name: "result",
      component: Result
    }
  ]
});
