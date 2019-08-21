<script>
export default {
    data(){
        return{
            author:{
                username:"",
                password:""
            },
            error_message:""
        }
    },

    methods:{
        login(){
            this.$store.dispatch("login", this.author)
            .then(() => {
                this.$router.push("/");
            })
            .catch((err) => {
                this.error_message = "Dont Success Login."
            })
        }
    }
}
</script>

<template>
    <div class="background">
        <b-container>
            <b-row class="mx-auto">
                <b-col cols="3"></b-col>
                <b-col cols="5" class="text-center">
                    <b-alert v-if="error_message" class="alert w-100" show> {{ error_message }} </b-alert>
                </b-col>
                
                <b-col cols="4"></b-col>
                <b-col cols="3"></b-col>
                <b-col cols="5" class="text-white">
                    <b-form @submit.prevent="login">
                        <label>Username</label>
                        <b-form-input type="text" v-model="author.username" required placeholder="Username..."></b-form-input>
                        <label>Password</label>
                        <b-form-input type="password" v-model="author.password" required placeholder="Password..."></b-form-input>
                        <b-button class="mt-3 login-button w-100" type="submit">Login</b-button>
                    </b-form>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<style scoped>
    .background{
        height: 100%;
        background-image: url("../../assets/background-user.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        position: fixed;
        display:flex;
        align-items: center;
        justify-content:center;
    }

    .login-button{
        background-color: #5f8985;
        border-radius: 20px;
        border-color: #34394d;
    }

    .login-button:hover{
        box-shadow:0 0 0 0.1em #34394d;
    }

    .alert{
        color: #ffffff;
        background-color: #71ab9c;
    }

    input{
        background-color: transparent;
        color: white;
        border-color: #34394d;
        border-width: 2px;
        border-radius: 20px;
    }

    input:focus{
        background-color: transparent;
        color:white;
        box-shadow:0 0 0 0.1rem #34394d;
        border-color: #34394d;
    }

    ::placeholder{
        color: white;
    }
</style>