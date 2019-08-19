import Article from "./components/home/article.vue"
import authorPosts from "./components/home/authorPosts.vue"
import searchArticles from "./components/home/searchArticles.vue"
import Home from "./components/home/home.vue"
import VueRouter from "vue-router"

import admin_routes from "./routes/admin_routes";
import user_routes from "./routes/user_routes";

const router = new VueRouter({
    routes:[
      ...admin_routes,
      ...user_routes,
      {path:"/", component:Home, name:"home"},
      {path:"/author/:authorName", component:authorPosts, name:"author"},
      
      {path:"/article/:slug", name:"article", component:Article},
      {path:"/search", name:"search", component:searchArticles},
     

      
    ],
    mode:"history"
});

export default router;




/*if(store.state.auth.token){
            store.dispatch("checkToken", store.state.auth.token)
            .then(() => {
              if (store.state.auth.user.role == "admin") {
                router.push("/");
              }
              else{
                router.push("/about");
              }
              
            })
            .catch(() => {
              next();
            })
          }
          else{
            next();
          }*/