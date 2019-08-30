<script>
const BASE_URL = "http://www.localhost:8000"
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import EventBus from "../event-bus";
export default {

    beforeCreate(){
        
        this.axios.get(location.origin + "/api/get/authors")
        .then(response => this.authors = response.data.authors.filter(author => author.role == "admin") );
        
        this.axios.get(location.origin + "/api/get/categories")
        .then(response => this.categories = response.data.categories)
    },

    data:() => {
        return{
            article:{
                title:"",
                content:"",
                author:"",
                category_slug:""
            },
            authors:[],
            categories:[],
            success_message:"",
            error_message:"",
            editor: ClassicEditor,
    }},

    methods:{
        add(){

            if (this.article.content !== "") {
                this.$store.dispatch("addArticle", this.article)
                .then(response => this.success_message = "Makale Başarıyla Eklendi")
                .catch(error => this.error_message = error);
            }

            else{
                this.error_message = "Makale Eklenemedi Lütfen İçeriği Doldurunuz."
            }
        }
    },

}
</script>

<template>
    <admin-sidebar>

        <!-- Alerts -->
        <b-alert v-if="success_message" variant="success" show class="mt-3">{{ success_message }}</b-alert>
        <b-alert v-if="error_message" variant="danger" show class="mt-3">{{ error_message }}</b-alert>
        <!-- ./ Alerts -->
        
        <b-col cols="8" class="w-50">
            <b-form method="post" @submit.prevent="add" class="mt-3">

                <label>Category</label>
                <b-form-select  name="category" v-model="article.category_slug" required>
                    <option  v-for="category in categories" :key="category.title" :value="category.slug">{{ category.title }}</option>
                </b-form-select>

                <label>Author</label>
                <b-form-select  name="author" v-model="article.author" required>
                    <option  v-for="author in authors" :key="author.username" :value="author.username">{{ author.username }}</option>
                </b-form-select>

                <label>Title</label>
                <b-form-input name="title" v-model="article.title" placeholder="Article Title..." required></b-form-input>

                <label>Content</label>
                <ckeditor name="content" :editor="editor" v-model="article.content"></ckeditor>
                
                <b-btn variant="danger" type="submit" class="w-50 mt-2">Add Article</b-btn>
            </b-form>
        </b-col>
        
    </admin-sidebar>
</template>
