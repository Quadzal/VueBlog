const mongoose = require("mongoose");
const slugify = require("slugify");

const CategorySchema = new mongoose.Schema({
    title:{type:String, required:true, unique:true},
    slug:{type:String},
    created_date:{type:Date, default:Date.now}
});

CategorySchema.pre("save", function(next){
    this.slug = slugify(this.title);
    next();
});

CategorySchema.post("remove", async function(next) {
    const articleModel = require("./Article");
    await articleModel.deleteMany({category:this.slug});
    next();
});

CategorySchema.pre("updateOne", async function(next){
    this.slug = slugify(this.title);
    next();
})

const CategoryModel = mongoose.model("category", CategorySchema);

module.exports = CategoryModel;