<script>
export default {
    data(){
        return{
            fields:["_id", "title", "update_button", "delete_button"],
            errorMessage:"",
            search:"",
            categories:[]
        }
    },

    methods:{
        deleteCategory(slug){
            this.$store.dispatch("deleteCategory", slug)
            .then(() => location.reload())
            .catch((err) => {
                this.errorMessage = "Kategori Silinemedi..."
            });
        }
    },

    computed:{
        GET_SEARCH_CATEGORIES(){
            return this.categories = this.$store.state.home.categories.filter(category => category.title.toLowerCase().includes(this.search.toLowerCase()));
        }
    },

    beforeCreate(){
        this.$store.dispatch("getCategories").then(() => {
            this.categories = this.$store.state.home.categories;
        })
    },
}
</script>

<template>
    <div>
        <admin-sidebar>
            <b-alert v-if="errorMessage" variant="danger" show>{{ errorMessage }}</b-alert>
            <b-col cols="3" class="mt-2">
                <b-form-input placeholder="Search For Title..." v-model="search"></b-form-input>
            </b-col>
            <b-table striped responsive hover :items="GET_SEARCH_CATEGORIES" :fields="fields" class="mt-3">
                <template slot="update_button" slot-scope="row">
                    <router-link :to="{name:'updateCategory', params:{slug:row.item.slug}}"><b-button variant="primary">Update</b-button></router-link>
                </template>

                <template slot="delete_button" slot-scope="row">
                    <b-button variant="danger" @click="deleteCategory(row.item.slug)">Delete</b-button>
                </template>
            </b-table>
        </admin-sidebar>
    </div>
</template>


