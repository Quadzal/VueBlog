import axios from "axios"
const BASE_URL = "http://www.localhost:8000"

const auth = {

    state:{
        token:"",
        user:{},
        isLoggedIn:false
    },

    getters:{
        user(state) {
            return state.user;
        }
    },
    
    mutations:{
        setToken(state, data){
            
            state.token = data.user.token;
            state.user = data.user;
            state.isLoggedIn = true
        },

        logOut(state){
            state.token = ""
            state.user = {}
            state.isLoggedIn = false;
        }
    },

    actions:{
        
        login(context, data){
            return axios.post(BASE_URL + "/api/auth/login", data).then(resp => context.commit("setToken", resp.data));
        },

        register(context, data){
            return axios.post(BASE_URL + "/api/auth/register", data).then(resp => context.commit("setToken", resp.data))
        },

        checkToken(context, token){
            return axios.post(BASE_URL + "/api/auth/check/token", {token:token});
        },

        logOut(context){
            context.commit("logOut");
        }
    }

};

export default auth