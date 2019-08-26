import auth_services from "../services/auth_services";
import UpdateArticle from "../components/admin/update-article.vue"
import ListArticles from "../components/admin/list-articles.vue"
import AddArticle from "../components/admin/add-article.vue";
import router from "../router";
import Dashboard from "../components/admin/dashboard"
import AddCategory from "../components/admin/add-category";
import UpdateCategory from "../components/admin/update-category";
import ListCategories from "../components/admin/list-categories";

const routes = [
    {path:"/admin", component:Dashboard, name:"dashboard"},
    {path:"/admin/add/article", component:AddArticle, name:"addArticle"},

    {path:"/admin/update/article/:article_slug", component:UpdateArticle, name:"updateArticle"},

    {path:"/admin/list/articles", component:ListArticles, name:"listArticles"},

    {path:"/admin/list/categories", component:ListCategories, name:"listCategories"},
    {path:"/admin/add/category", component:AddCategory, name:"addCategory"},
    {path:"/admin/update/category/:slug", component:UpdateCategory, name:"updateCategory"}
    
]

routes.forEach(route => {
  route.beforeEnter =  function (to, from, next) {
    auth_services(router, {login_url:"/login", unauth_url:"/"}, ["admin"])
    .then(() => {
        next()
    });
  }
})

export default routes
