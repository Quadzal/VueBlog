<template>
    <div>
        <navbar></navbar>
        <home-layout :articles="articles" :pagesNumber="10" routeName="category"></home-layout>
    </div>
    
</template>

<script>
import HomeLayout from "../../layouts/home-layout"
export default {

    beforeCreate(){
        this.$store.dispatch("getCategoryWithArticles", this.$route.params.slug)
        .then((response)=> {
            this.articles = response.data.articles;
        })
    },
    data(){
        return {
            articles:[]
        }
    },

    components:{"home-layout":HomeLayout}
    
}
</script>