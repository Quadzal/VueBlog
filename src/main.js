import Vue from 'vue'
import App from './App.vue'
import "./config.js";
import Navbar from "./layouts/navbar.vue"
import store from "./store"
import router from "./router"
import sidebar from "./layouts/sidebar";
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
let checkToken = () => {
  return new Promise(function(resolve, reject){
    let token = store.state.auth.token;
    if (token) {
      store.dispatch("checkToken", token)
      .then((response) => {
        store.state.auth.user = response.data.user;
        store.state.auth.isLoggedIn = true;
        resolve(response.data.user)
      })
      .catch((err) => {
        store.state.auth.user = {}
        store.state.auth.isLoggedIn = false;
      })
    }
  })
  
}

Vue.component("navbar", Navbar)
Vue.component("admin-sidebar", sidebar);
new Vue({
  beforeCreate(){
    checkToken()
    this.$store.dispatch("getArticles")

  },
  el: '#app',
  router,   
  store,
  render: h => h(App),
})
