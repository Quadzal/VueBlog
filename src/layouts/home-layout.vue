<script>
export default {
    props:["articles", "pagesNumber", "routeName"],

    methods:{
        linkGenerator(pageNum){
            return {
                name:this.$props.routeName,
                query:{page:pageNum}
            }
        }
    },
}
</script>

<template>
    <div class="bg-light">
        <b-container>
            <b-row>
                <!-- Articles -->
                <div v-if="articles.length > 0" id="articles">
                    
                    <b-col md="12" v-for="article in articles" :key="article.title" >
                        <router-link :to="{name:'article', params:{slug:article.slug}}">
                            <h5 class="display-4 mt-5">{{ article.title }}</h5>
                        </router-link>
                        <router-link :to="{name:'author', params:{authorName:article.author}}">@{{ article.author }}</router-link>

                        <h5 class="text-secondary" v-html="article.content.slice(0,100)"></h5>
                        <router-link :to="{name:'article', params:{slug:article.slug}}">
                            <font-awesome-icon :icon="['fas','arrow-right']"/>
                        </router-link>
                        

                    </b-col>
                    
                    <b-pagination-nav :link-gen="linkGenerator" :number-of-pages="pagesNumber" use-router></b-pagination-nav>
                    
                </div>
                <!-- ./Articles -->
                
                <b-col md="12" v-else>
                    <b-alert show variant="danger"> Articles Not Found </b-alert>
                </b-col>
            </b-row>
        </b-container>
        
    </div>
</template>


<style scoped>
    a{
        text-decoration: none;
    }
</style>



