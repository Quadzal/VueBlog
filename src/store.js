import Vuex from 'vuex'
import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from "axios"
import Auth from "./store/auth";
import Home from "./store/home";
import Admin from "./store/admin";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);
Vue.use(VueAxios, axios)

const store = new Vuex.Store({
    modules:{auth:Auth, home:Home, admin:Admin},
    plugins:[createPersistedState({
        paths:["auth.token"]
    })]
})

export default store