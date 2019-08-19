<script>
import HomeLayout from "../../layouts/home-layout"
import store from "../../store";
import Axios from "axios"
export default {

    created(){
        if (this.GET_ARTICLES.length == 0) {
            this.$store.dispatch("getArticles");
        }
        
    },

    computed:{
        GET_ARTICLES(){
            return this.$store.state.home.articles;
        },

        GET_PAGINATED_ARTICLES(){
            let page = this.$route.query.page || 1
            return this.$store.getters.GET_PAGINATE_ARTICLES(page, 10);
        }
    },
    components:{"home-layout":HomeLayout}
}
</script>

<template>
    <div>
        <navbar></navbar>
        <home-layout :articles="GET_PAGINATED_ARTICLES.articles" :pagesNumber="GET_PAGINATED_ARTICLES.pages"></home-layout>
    </div>
</template>



