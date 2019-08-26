import axios from "axios"
import store from "../store";
const home = {


    state:{
        articles: [],
        authorArticles:{},
        articleDetail:{},
        addedComment:{},
        deletedMessage:"",
        categories:[],
    },

    getters:{
        GET_ARTICLES(state){
            return state.articles;
        },

        GET_PAGINATE_ARTICLES: (state) => (page, perPage) => {
            let paginated = []
            paginated["articles"] = state.articles.slice((page - 1) * perPage, page * perPage )
            paginated["pages"] = Math.ceil((state.articles.length) / perPage)
            return paginated
        }
    },
    
    mutations:{

        setArticles(state, articles){
            state.articles = articles;
        },

        setAuthorArticles(state, author){
            state.authorArticles = author;
        },
        
        setArticleDetail(state, article){
            state.articleDetail = article
        },
        
        addComment(state, comment){
            state.addedComment = comment
        },

        setCategories(state, categories){
            state.categories = categories;
        },

    },

    actions:{
        
        getArticles(context){
            return axios.get("/api/get/articles").then(resp => {context.commit("setArticles", resp.data.articles)})
        },

        getCategory(context, slug){
            return axios.get("/api/get/category/" + slug);
        },

        getCategories(context){
            return axios.get("/api/get/categories").then(resp => {context.commit("setCategories", resp.data.categories)});
        },

        getAuthorArticles(context, authorName){
            return axios.get("/api/get/author/" + authorName).then(resp => context.commit("setAuthorArticles", resp.data.articles))
        },
        
        getArticleDetail(context, slug){
            return axios.get("/api/get/article/" + slug).then(resp => context.commit("setArticleDetail", resp.data.article))
        },
        
        addComment(context, data){
            return axios.post("/api/add/comment/" + data.slug, data.comment).then(resp => context.commit("addComment", resp.data.comment));
        },
        
        getCategoryWithArticles(context, slug){
            return axios.get("/api/get/category/articles/" + slug);
        }
    }
}

export default home