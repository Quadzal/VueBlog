<script>
export default {
    data(){
        return {
            author:{
                username:"",
                password:"",
                email:"",
                first_name:"",
                last_name:""
            }
        }
    },

    methods:{
        register(){
            this.$store.dispatch("register", this.author)
            .then(() => {
                this.$router.push("/");
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>

<template>
    <b-container>
        <b-row class="mx-auto">
            <b-col cols="3"></b-col>
            <b-col cols="6" >
                <b-form @submit.prevent="register">
                    <label>First Name</label>
                    <b-form-input type="text" v-model="author.first_name" required></b-form-input>
                    <label>Last Name</label>
                    <b-form-input type="text" v-model="author.last_name" required></b-form-input>
                    <label>Username</label>
                    <b-form-input type="text" v-model="author.username" required></b-form-input>
                    <label>Email</label>
                    <b-form-input type="email" v-model="author.email" required></b-form-input>
                    <label>Password</label>
                    <b-form-input type="password" v-model="author.password" required></b-form-input>
                    <b-button variant="danger" class="mt-2 w-50" type="submit">Register</b-button>
                </b-form>
            </b-col>
            <b-col cols="3"></b-col>
        </b-row>
    </b-container>
</template>