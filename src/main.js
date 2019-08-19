import Vue from 'vue'
import App from './App.vue'
import "./config.js";
import Navbar from "./layouts/navbar.vue"
import store from "./store"
import router from "./router"
import Axios from "axios"

Vue.component("navbar", Navbar)

new Vue({
  el: '#app',
  data:{loading:false},
  router,
  store,
  render: h => h(App),
  
})
