<script>
const BASE_URL = "http://www.localhost:8000/";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import sidebar from "../../layouts/sidebar";
export default {
    data:() => {
        return{
            article:{
                title:"",
                content:"",
                author:""
            },
            authors:null,
            success_message:"",
            error_message:"",
            editor: ClassicEditor,
    }},

    methods:{
        add(){
            this.$store.dispatch("addArticle", this.article)
            .then(response => {this.success_message = "Makale Başarıyla Eklendi"})
            .catch(error => {this.error_message = "Makale Eklenemedi Lütfen Hatasız Doldurunuz."});
        }
    },

    beforeCreate(){
        this.axios.get(BASE_URL+"api/get/authors").then(response => {
            this.authors = response.data.filter(author => author.role == "admin");
        });
    },
    components:{sidebar:sidebar}

}
</script>

<template>
    <sidebar>
        <b-alert v-if="success_message" variant="success" show>{{ success_message }}</b-alert>
        <b-alert v-if="error_message" variant="danger" show>{{ error_message }}</b-alert>
        
        <b-form method="post" @submit.prevent="add">
            <label>Title</label>
            <b-form-input name="title" v-model="article.title"></b-form-input>
            <label>Content</label>
            <ckeditor name="content" :editor="editor" v-model="article.content"></ckeditor>
            <label>Author</label>
            <b-form-select  name="author" v-model="article.author">
                <option  v-for="author in authors" :key="author.username" :value="author._id">{{ author.username }}</option>
            </b-form-select>
            <b-btn variant="danger" type="submit" class="w-100 mt-2">Add Article</b-btn>
        </b-form>

    </sidebar>
</template>



