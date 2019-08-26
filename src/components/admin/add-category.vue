<script>
export default {
    data(){
        return {
            title:"",
            error_message:""
        }
    },

    methods:{
        addCategory(){
            this.$store.dispatch("addCategory", this.title)
            .then(() => {this.$router.push({name:"listCategories"})})
            .catch(() => {this.error_message = "Kategori Eklenemedi!"})
        }
    }
}
</script>   

<template>
    <admin-sidebar>
        <b-col cols="3" class="mt-5">
            <b-form-input v-model="title" placeholder="Category Title"></b-form-input>
            <b-button variant="danger" class="mt-2" @click="addCategory">Add Category</b-button>
        </b-col>
    </admin-sidebar>
</template>