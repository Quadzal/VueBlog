<template>
    <div>
        
    <b-navbar toggleable="lg" type="dark" variant="info">
        <router-link :to="{name:'home'}"><b-navbar-brand>Home</b-navbar-brand></router-link>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                
                <b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" name="q" v-model="search_query" placeholder="Search"></b-form-input>
                    <router-link :to="{name:'search', query:{q:search_query}}">
                        <b-button size="sm" class="my-2 my-sm-0">Search</b-button>
                    </router-link>
                    
                </b-nav-form>

                <b-nav-item-dropdown right v-if="IS_LOGIN">
                    <!-- Using 'button-content' slot -->
                    <template slot="button-content"><em>{{GET_USER.first_name}} {{ GET_USER.last_name }}</em></template>
                    <!--<b-dropdown-item href="#">Profile</b-dropdown-item>-->
                    <b-dropdown-item :to="{name:'dashboard'}" v-if="GET_USER.role == 'admin'">Dashboard</b-dropdown-item>
                    <b-dropdown-item :to="{name:'logout'}">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
                
                <b-navbar-nav right v-if="!IS_LOGIN">
                    <!-- Using 'button-content' slot -->
                    <b-nav-item :to="{name:'login'}">Login</b-nav-item>
                    <b-nav-item :to="{name:'register'}">Register</b-nav-item>
                </b-navbar-nav>
            </b-navbar-nav>
        </b-collapse>
  </b-navbar>
</div>
</template>
<script>
export default {
    data(){
        return {
            search_query:""
        }
    },
    computed:{
        IS_LOGIN(){
            return Object.keys(this.GET_USER).length !== 0 ? true : false
        },

        GET_USER(){
            return this.$store.state.auth.user
        }
    },
}
</script>

