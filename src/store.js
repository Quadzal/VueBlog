import Vuex from 'vuex'
import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from "axios"
import Auth from "./store/auth";
import Home from "./store/home";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);
Vue.use(VueAxios, axios)

const store = new Vuex.Store({
    modules:{auth:Auth, home:Home},
    plugins:[createPersistedState({
        paths:["auth"]
    })]
})

export default store