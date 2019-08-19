import axios from "axios"

const store = {


    state:{
        articles: [],
        authorArticles:{},
        articleDetail:{},
        addedComment:{},
        deletedMessage:"",
    },

    getters:{
        GET_ARTICLES(state){
            return state.articles;
        },

        GET_PAGINATE_ARTICLES: (state) => (page, perPage) => {
            let paginated = []
            paginated["articles"] = state.articles.slice((page - 1) * perPage, page * perPage )
            paginated["pages"] = Math.ceil((state.articles.length - 1) / perPage)
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
        
        addArticle(state, article){
            const articles = state.articles;
            articles.push(article);
            localStorage.setItem("articles", JSON.stringify(articles));
            store.commit("getArticles", articles);
        },

        deleteArticle(state, article){
            state.deletedMessage = article.title + " Makalesi Başarıyla Silindi."
        },

        addComment(state, comment){
            state.addedComment = comment
        },

    },

    actions:{
        
        getArticles(context){
            return axios.get(window.location.origin + "/api/get/articles").then(resp => {context.commit("setArticles", resp.data.articles)})
        },
        
        getAuthorArticles(context, authorName){
            return axios.get(window.location.origin + "/api/get/author/" + authorName).then(resp => context.commit("setAuthorArticles", resp.data.author))
        },
        
        getArticleDetail(context, slug){
            return axios.get(window.location.origin + "/api/get/article/" + slug).then(resp => context.commit("setArticleDetail", resp.data.article))
        },
        
        addArticle(context, data){
            return axios.post(window.location.origin + "/api/add/article", data).then(resp => context.commit("addArticle", resp.data.article))
        },

        addComment(context, data){
            return axios.post(window.location.origin + "/api/add/comment", data).then(resp => context.commit("addComment", resp.data.comment));
        },
        
        updateArticle(context, data) {
            return axios.post(window.location.origin + "/api/update/article/" + data.slug, data).then(resp => context.commit("updateArticle", resp.data.article))
        },

        deleteArticle(context, slug){
            return axios.post(window.location.origin + "/api/delete/article/" + slug).then(resp => context.commit("deleteArticle", resp.data.deleted_article))
        }
    }
}

export default store