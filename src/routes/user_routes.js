import Register from "../components/user/register"
import Login from "../components/user/login"
import store from "../store";
import router from "../router";
export default [
    {path:"/register", name:"register", component:Register},
    {path:"/login", name:"login", component:Login},
    
    {path:"/logout", name:"logout", beforeEnter(to, from, next){
      store.dispatch("logOut");
      router.push("/");
    }},
]