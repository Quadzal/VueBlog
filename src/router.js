import Article from "./components/home/article.vue"
import authorPosts from "./components/home/authorPosts.vue"
import searchArticles from "./components/home/searchArticles.vue"
import Home from "./components/home/home.vue"
import VueRouter from "vue-router"
import categoryPosts from "./components/home/categoryPosts";
import admin_routes from "./routes/admin_routes";
import user_routes from "./routes/user_routes";

const router = new VueRouter({
    routes:[
      ...admin_routes,
      ...user_routes,
      {path:"/", component:Home, name:"home"},
      {path:"/author/:authorName", component:authorPosts, name:"author"},
      {path:"/category/:slug", component:categoryPosts, name:"category"},
      {path:"/article/:slug", name:"article", component:Article},
      {path:"/search", name:"search", component:searchArticles},
      
    ],
    mode:"history"
});
export default router;
