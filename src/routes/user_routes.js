import Register from "../components/user/register.vue"
import Login from "../components/user/login"
import store from "../store";
import router from "../router";
import is_authenticated from "../services/is_authenticated";
const routes = [
  {path:"/register", name:"register", component:Register},
  {path:"/login", name:"login", component:Login},
  
]

routes.forEach(route => {
  route.beforeEnter = function(to, from, next){
    is_authenticated(router, next, "/")
  }
});

routes.push(
  {path:"/logout", name:"logout", beforeEnter(to, from, next){
    store.dispatch("logOut");
    router.push("/");
  }},
);

export default routes;