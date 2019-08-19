<template>
    <div>
        <navbar></navbar>
        <error error="Author Articles Not Found..." v-if="GET_AUTHOR_ARTICLES.length == 0"></error>
        <home-layout :articles="GET_AUTHOR_ARTICLES"></home-layout>
    </div>
    
</template>

<script>
import HomeLayout from "../../layouts/home-layout"
import ErrorLayout from "../../layouts/error";
export default {

    created(){
        if (this.GET_ARTICLES.length == 0) {
            this.$store.dispatch("getArticles")
        }
        
    },
    
    computed:{
        GET_ARTICLES(){
            return this.$store.getters.GET_ARTICLES
        },

        GET_AUTHOR_ARTICLES(){
            return this.GET_ARTICLES.filter(article => article.author.username == this.$route.params.authorName);
        }
    },

    components:{"home-layout":HomeLayout, "error":ErrorLayout}
    
}
</script>