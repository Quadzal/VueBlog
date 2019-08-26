<script>
export default {
    data(){
        return {
            category:{},
            error_message:""
        }
    },

    methods:{
        updateCategory(){
            this.$store.dispatch("updateCategory", this.category)
            .then(() => {this.$router.push({name:"listCategories"})})
            .catch(() => {this.error_message = "Kategori Eklenemedi!"})
        }
    },

    beforeCreate(){
        this.$store.dispatch("getCategory", this.$route.params.slug).then(resp => this.category = resp.data.category);
    }
}
</script>

<template>
    <admin-sidebar>
        <b-col cols="3" class="mt-5">
            <b-form-input v-model="category.title" placeholder="Category Title"></b-form-input>
            <b-button variant="danger" class="mt-2" @click="updateCategory">Update Category</b-button>
        </b-col>
    </admin-sidebar>
</template>