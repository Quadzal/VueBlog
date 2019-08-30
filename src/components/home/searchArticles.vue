<script>
import HomeLayout from "../../layouts/home-layout"
export default {

    computed:{
        GET_FILTERED_ARTICLES(){
            let filtered_articles = this.$store.getters.GET_ARTICLES.filter(article => article.slug.toLowerCase().includes(this.$route.query.q.toLowerCase()))
            return filtered_articles
        },

    },

    components:{"home-layout": HomeLayout}
}
</script>

<template>
    <div>
        <navbar></navbar>
        <home-layout :articles="GET_FILTERED_ARTICLES"></home-layout>
        
    </div>
    
</template>

