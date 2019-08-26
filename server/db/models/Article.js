const mongoose = require("mongoose");
const slugify = require("slugify");
const ArticleSchema = new mongoose.Schema({
    author:{type:String, required:true},
    category_slug:{type:String, required:true},
    content:{type:String, required:true},
    title:{type:String, required:true, unique:true},
    slug:{type:String},
    created_date:{type:Date, default:Date.now},
    comments:[],

});

ArticleSchema.pre("save", function (next, doc) {
    this.slug = slugify(this.title);
    next();
});

ArticleSchema.pre("updateOne", async function(next) {
    this.slug = slugify(this.title);
    next();
})

const ArticleModel = mongoose.model("article", ArticleSchema);


module.exports = ArticleModel;

