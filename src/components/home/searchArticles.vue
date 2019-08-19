<script>
const BASE_URL = "http://www.localhost:8000/"
import HomeLayout from "../../layouts/home-layout"
export default {
 
    created(){
        if (this.GET_ARTICLES.length == 0) {
            this.$store.dispatch("getArticles")
        }
        
    },

    computed:{
        SEARCH_ARTICLES(){
            return this.GET_ARTICLES.filter(article => article.slug.toLowerCase().includes(this.$route.query.q.toLowerCase()));
        },

        GET_ARTICLES(){
            return this.$store.getters.GET_ARTICLES
        }
    },
    components:{"home-layout": HomeLayout}
}
</script>

<template>
    <div>
        <navbar></navbar>
        <home-layout :articles="SEARCH_ARTICLES"></home-layout>
    </div>
    
</template>

