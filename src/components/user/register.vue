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
            },
            error_message:""
        }
    },

    methods:{
        register(){
            this.$store.dispatch("register", this.author)
            .then(() => {
                this.$router.push("/");
            })
            .catch((err) => {
                this.error_message = "Dont Success Register."
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
                    <b-alert v-if="error_message" class="alert" show> {{ error_message }} </b-alert>
                </b-col>

                <b-col cols="4"></b-col>
                <b-col cols="3"></b-col>
                <!-- Register Form -->

                <b-col cols="5" >
                    <b-form @submit.prevent="register" class="text-white">
                        <label>First Name</label>
                        <b-form-input type="text" v-model="author.first_name" required placeholder="First Name..."></b-form-input>
                        <label>Last Name</label>
                        <b-form-input type="text" v-model="author.last_name" required placeholder="Last Name..."></b-form-input>
                        <label>Username</label>
                        <b-form-input type="text" v-model="author.username" required placeholder="Username..."></b-form-input>
                        <label>Email</label>
                        <b-form-input type="email" v-model="author.email" required placeholder="Email..."></b-form-input>
                        <label>Password</label>
                        <b-form-input type="password" v-model="author.password" required placeholder="Password..."></b-form-input>
                        <b-button class="mt-3 w-100 register-button" type="submit">Register</b-button>
                    </b-form>
                </b-col>
                <!-- ./Register Form -->

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
    }
    
    .register-button{
        background-color: #5f8985;
        border-radius: 20px;
        border-color: #34394d;
    }
    
    .register-button:hover{
        box-shadow:0 0 0 0.2em #34394d;
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
        box-shadow:0 0 0 0.1em #34394d;
        border-color: #34394d;
    }
    ::placeholder{
        color: white;
    }
</style>