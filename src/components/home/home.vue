<script>
import HomeLayout from "../../layouts/home-layout"
import store from "../../store";
import Axios from "axios"
export default {

    beforeCreate(){
        this.$store.dispatch("getArticles");
    },

    computed:{
        GET_ARTICLES(){
            return this.$store.state.home.articles;
        },

        GET_PAGINATED_ARTICLES(){
            let page = this.$route.query.page || 1
            let articles = this.$store.getters.GET_PAGINATE_ARTICLES(page, 10);
            return articles
        }
    },
    components:{"home-layout":HomeLayout}
}
</script>

<template>
    <div>
        <navbar></navbar>
        <div v-if="GET_PAGINATED_ARTICLES.articles.length > 0">
            <home-layout :articles="GET_PAGINATED_ARTICLES.articles" :pagesNumber="GET_PAGINATED_ARTICLES.pages" routeName="home"></home-layout>
        </div>
        
    </div>
</template>



