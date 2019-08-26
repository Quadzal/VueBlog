<script>
import sidebar from "../../layouts/sidebar";
export default {
    data(){
        return{
            fields:["_id", "title", "author", "update_button", "delete_button"],
            errorMessage:"",
            search:"",
            articles:[]
        }
    },

    methods:{
        deleteArticle(slug){
            this.$store.dispatch("deleteArticle", slug)
            .then(() => location.reload())
            .catch((err) => {
                this.errorMessage = "Makale Silinemedi..."
            });
        }
    },

    computed:{

        GET_SEARCH_ARTICLES(){
            return this.articles = this.$store.state.home.articles.filter(article => article.title.toLowerCase().includes(this.search.toLowerCase()));
        }
    },

    beforeCreate(){
        this.$store.dispatch("getArticles").then(() => {
            this.articles = this.$store.state.home.articles;
        })
    },
    components:{sidebar:sidebar}
}
</script>

<template>
    <div>
        <admin-sidebar>
            <b-alert v-if="errorMessage" variant="danger" show>{{ errorMessage }}</b-alert>
            <b-col cols="3" class="mt-2">
                <b-form-input placeholder="Search For Title..." v-model="search"></b-form-input>
            </b-col>
            <b-table striped responsive hover :items="GET_SEARCH_ARTICLES" :fields="fields" class="mt-3">
                <template slot="update_button" slot-scope="row">
                    <router-link :to="{name:'updateArticle', params:{article_slug:row.item.slug}}"><b-button variant="primary">Update</b-button></router-link>
                </template>

                <template slot="delete_button" slot-scope="row">
                    <b-button variant="danger" @click="deleteArticle(row.item.slug)">Delete</b-button>
                </template>
            </b-table>
        </admin-sidebar>
    </div>
</template>


