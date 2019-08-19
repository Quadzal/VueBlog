<script>
export default {
    data(){
        return{
            author:{
                username:"",
                password:""
            }
        }
    },

    methods:{
        login(){
            this.$store.dispatch("login", this.author)
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
                <b-form @submit.prevent="login">
                    <label>Username</label>
                    <b-form-input type="text" v-model="author.username"></b-form-input>
                    <label>Password</label>
                    <b-form-input type="password" v-model="author.password"></b-form-input>
                    <b-button variant="danger" class="mt-2 w-50" type="submit">Login</b-button>
                </b-form>
            </b-col>
            <b-col cols="3"></b-col>
        </b-row>
    </b-container>
</template>