import store from "../store";
import axios from "axios"

const admin = {

    mutations:{
        addArticle(state, article){
            const articles = store.state.home.articles;
            articles.push(article);
            store.commit("setArticles", articles);
        },
    },
    actions:{
        addArticle(context, data){
            return axios.post(location.origin + "/api/add/article", data).then(resp => context.commit("addArticle", resp.data.article))
        },

        updateArticle(context, data) {
            return axios.post(location.origin + "/api/update/article/" + data.slug, data)
        },

        deleteArticle(context, slug){
            return axios.post(location.origin + "/api/delete/article/" + slug)
        },

        addCategory(context, title){
            return axios.post(location.origin + "/api/add/category", {title:title})
        },

        updateCategory(context, data){
            return axios.post(location.origin + "/api/update/category/" + data.slug, data);
        }
    }
}

export default admin