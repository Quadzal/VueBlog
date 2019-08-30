<script>

export default {
    props:["articles"],
    
    data(){
        return{
            error:{
                message:"Articles Not Found",
            }
        }
        
    },
    
}

</script>

<template>
    <div class="bg-light">
        <b-container>
            <b-row>
                <!-- Articles -->
                <div v-if="articles.length > 0" id="articles">
                    
                    <b-col md="12" v-for="article in articles" :key="article.title" >

                        <!-- Title -->
                        <router-link :to="{name:'article', params:{slug:article.slug}}">
                            <h5 class="display-4 mt-5">{{ article.title }}</h5>
                        </router-link>
                        
                        <!-- Author -->
                        <router-link :to="{name:'author', params:{authorName:article.author}}">@{{ article.author }}</router-link>
                        
                        <!-- Content -->
                        <h5 class="text-secondary" v-html="article.content.slice(0,100)"></h5>
                        
                        <router-link :to="{name:'article', params:{slug:article.slug}}">
                            <font-awesome-icon :icon="['fas','arrow-right']"/>
                        </router-link>
                        
                    </b-col>
                    

                </div>
                <!-- ./Articles -->
                
                <!-- Error Message -->
                <b-col md="12" v-else class="mt-3">
                    <b-alert show variant="danger"> {{error.message}} </b-alert>
                </b-col>

            </b-row>
        </b-container>
        
    </div>
</template>


<style scoped>
    a{
        text-decoration: none;
    }

</style>



