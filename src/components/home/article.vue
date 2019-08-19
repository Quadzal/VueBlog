<script>
import AddComment from "../../layouts/add-comment-form"
import ErrorLayout from "../../layouts/error"
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

        GET_ARTICLE(){
            return this.GET_ARTICLES.filter(article => article.slug == this.$route.params.slug)[0];
        },

        GET_USER(){
            return this.$store.state.auth.user
        },

        IS_LOGIN(){
            return Object.keys(this.GET_USER).length !== 0 ? true : false
        }
    },

    components:{"add-comment-form":AddComment, "error":ErrorLayout}

}
</script>


<style scoped>
    .footer{
        background-color: #f3f3f3;
        
    }
</style>

<template>
    <div>
        <navbar></navbar>
        <div v-if="!GET_ARTICLE">
            <error error="Article Not Found..."></error>
        </div>
    
        <div v-if="GET_ARTICLE">
            
            <div class="bg-light">
                <b-container>
                    <b-row>
                        <!--Article-->
                        <b-col md="12" v-if="GET_ARTICLE">
                            <h5 class="display-4 mt-5 text-center">{{ GET_ARTICLE.title }}</h5>
                            <h5 class="text-secondary mt-5" v-html="GET_ARTICLE.content"></h5>
                                
                            <hr>
                            <font-awesome-icon :icon="['far','user']" :style="{ color: 'black'}"/>
                            <router-link :to="{name:'author', params:{authorName:GET_ARTICLE.author.username}}">@{{ GET_ARTICLE.author.username }}</router-link>
                            <hr>
                                
                        </b-col>
                            <!--./Article-->
                    </b-row>
                    
                </b-container>
                
            </div>
            
            <div class="footer p-5"></div>

            <add-comment-form v-if="GET_ARTICLE && IS_LOGIN" :articleId="GET_ARTICLE._id" :authorId="GET_USER._id" :comments="GET_ARTICLE.comments"></add-comment-form>
        </div>
    </div>
</template>


