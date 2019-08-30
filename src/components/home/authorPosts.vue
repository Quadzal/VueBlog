<script>
import HomeLayout from "../../layouts/home-layout"
export default {

    computed:{
        GET_ARTICLES(){
            return this.$store.getters.GET_ARTICLES
        },

        GET_AUTHOR_ARTICLES(){
            return this.GET_ARTICLES.filter(article => article.author == this.$route.params.authorName);
        }
    },

    components:{"home-layout":HomeLayout}
    
}
</script>

<template>
    <div>
        <navbar></navbar>
        <home-layout :articles="GET_AUTHOR_ARTICLES"></home-layout>
    </div>
    
</template>

