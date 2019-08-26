<template>
    <div class="bg-light">
        <b-container>
            <b-row>
                <b-col md="12" class="mt-3">
                    <b-textarea rows="3" cols="100" v-model="comment.content"  class="bg-light"/>
                    <b-button @click="addComment" class="w-50 mb-3" variant="success">Yorumu Gönder</b-button>
                    <div v-if="comments.length > 0" class="mt-5">
                        <div v-for="articleComment in comments" :key="articleComment.created_date">
                        <b-card class="bg-light mb-3">
                            <b-media>
                                <b-img slot="aside" blank blank-color="#ccc" width="64" alt="placeholder"></b-img>
            
                                <h5 class="mt-0">@{{ articleComment.author }}</h5>
                                <p>{{ articleComment.content }}</p>
                            
                            </b-media>
                        </b-card>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
    props:["article_slug", "author", "comments"],
    data(){
        return {
            comment:{
                content:"",
                author:this.$props.author,
            },
        }
    },
    methods:{
        addComment(){
            this.$store.dispatch("addComment", {slug:this.$props.article_slug, comment:this.comment})
            .then(() => {
                this.$props.comments.push(this.$store.state.home.addedComment);
            })
            
        }
    }
}
</script>
