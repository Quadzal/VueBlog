<script>
import sidebar from "../../layouts/sidebar";
export default {
    data(){
        return{
            fields:["_id", "title", {key:"author.username", label:"Author"}, "update_button", "delete_button"],
            errorMessage:""
        }
    },

    methods:{
        deleteArticle(article_slug){
            this.$store.dispatch("deleteArticle", article_slug)
            .then(() => location.reload())
            .catch((err) => {
                this.errorMessage = "Makale Silinemedi..."
            });
        }
    },

    computed:{

        deletedMessage(){
            return this.$store.state.deletedMessage ? this.$store.state.deletedMessage : false
        },
        
        GET_ARTICLES(){
            return this.$store.state.home.articles
        }
    },

    beforeCreate(){
        this.$store.dispatch("getArticles")
    },
    components:{sidebar:sidebar}
}
</script>

<template>
    <div>
        <sidebar>
            <b-alert v-if="deletedMessage" variant="success" show>{{ deletedMessage }}</b-alert>
            <b-alert v-if="errorMessage" variant="danger" show>{{ errorMessage }}</b-alert>

            <b-table striped responsive hover :items="GET_ARTICLES" :fields="fields">
                <template slot="update_button" slot-scope="row">
                    <router-link :to="{name:'updateArticle', params:{article_slug:row.item.slug}}"><b-button variant="primary">Update</b-button></router-link>
                </template>

                <template slot="delete_button" slot-scope="row">
                    <b-button variant="danger" @click="deleteArticle(row.item.slug)">Delete</b-button>
                </template>
            </b-table>
        </sidebar>
    </div>
</template>


