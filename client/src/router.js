import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import gameroom from './views/gameroom.vue'

//layout
import Landing from "./views/Landing.vue";
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
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: "/gameroom/:id",
      name: "gameroom",
      component: gameroom
    }
  ]
});
