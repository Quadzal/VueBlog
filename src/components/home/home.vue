<script>
import HomeLayout from "../../layouts/home-layout"


export default {
    computed:{
        GET_ARTICLES(){
            return this.$store.getters.GET_ARTICLES;
        },
    },
    components:{"home-layout":HomeLayout}
}
</script>

<template>
    <div>
        <navbar></navbar>
        <div>
            <home-layout :articles="GET_ARTICLES"></home-layout>
        </div>
        
    </div>
</template>



