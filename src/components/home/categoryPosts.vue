<script>
import HomeLayout from "../../layouts/home-layout"
export default {
    computed:{
        GET_ARTICLES(){
            return this.$store.getters.GET_ARTICLES
        },

        GET_CATEGORY_ARTICLES(){
            return this.GET_ARTICLES.filter(article => article.category_slug == this.$route.params.slug);
        }
    },

    components:{"home-layout":HomeLayout}
    
}
</script>

<template>
    <div>
        <navbar></navbar>
        
        <home-layout :articles="GET_CATEGORY_ARTICLES"></home-layout>

    </div>
    
</template>

