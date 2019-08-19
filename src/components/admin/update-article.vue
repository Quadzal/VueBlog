<template>
    <b-container class="mt-5">
        <b-alert v-if="success_message" variant="success" show>{{ success_message }}</b-alert>
        <b-alert v-if="error_message" variant="danger" show>{{ error_message }}</b-alert>

        <b-form method="post" @submit.prevent="update">
            <label>Author</label>
            <b-form-input v-model="article.author.username" name="author" readonly></b-form-input>

            <label>Title</label>
            <b-form-input name="title" v-model="article.title"></b-form-input>
            <label>Content</label>
            <ckeditor name="content" :editor="editor" v-model="article.content"></ckeditor>
            <b-btn variant="danger" type="submit" class="w-100 mt-2">Update Article</b-btn>
        </b-form>

    </b-container>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
   
    data(){
        return {
            article:{},
            editor: ClassicEditor,
            error_message:"",
            success_message:"",
        }
    },
    methods:{
        update(){
            this.$store.dispatch("updateArticle", this.article)
            .then(() => {
                this.success_message = "Makale Başarıyla Güncellendi."
            }).catch((err) => {
                this.error_message = "Makale Güncellenemedi."
            });
        }
    },
    created(){
        this.article = this.$store.dispatch("getArticleDetail", this.$route.params.article_slug)
        .then(() => {this.article = this.$store.state.articleDetail})
    }
}
</script>