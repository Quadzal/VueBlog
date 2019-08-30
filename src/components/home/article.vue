<script>
import AddComment from "../../layouts/add-comment-form"
import ErrorLayout from "../../layouts/error"
export default {

    computed:{

        GET_ARTICLE(){
            let article = this.$store.state.home.articles.filter(a => a.slug == this.$route.params.slug);
            return article.length > 0 ? article[0] : false
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

<template>
    <div>
        <navbar></navbar>
        <div v-if="GET_ARTICLE">
            
            <div class="bg-light">
                <b-container>
                    <b-row>
                        <!--Article-->
                        <b-col md="12">
                            <h5 class="display-4 mt-5 text-center">{{ GET_ARTICLE.title }}</h5>
                            <h5 class="text-secondary mt-5" v-html="GET_ARTICLE.content"></h5>
                                
                            <hr>
                            <font-awesome-icon :icon="['far','user']" :style="{ color: 'black'}"/>
                            <router-link :to="{name:'author', params:{authorName:GET_ARTICLE.author}}">@{{ GET_ARTICLE.author }}</router-link>
                            <hr>
                                
                        </b-col>
                            <!--./Article-->
                    </b-row>
                    
                </b-container>
                <add-comment-form 
                    v-if="IS_LOGIN" 
                    :article_slug="GET_ARTICLE.slug" 
                    :author="GET_USER.username" 
                    :comments="GET_ARTICLE.comments">
                </add-comment-form>
                
                <div v-else>
                    <b-alert show variant="danger">Yorum Atmak İçin Giriş Yapınız.</b-alert>
                </div>

            </div>
            
        </div>
    </div>
</template>


