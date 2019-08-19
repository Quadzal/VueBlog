const mongoose = require("mongoose");
const slugify = require("slugify");

const ArticleSchema = new mongoose.Schema({
    author:{type:mongoose.Schema.Types.ObjectId, ref:"author"},
    comments:[{type:mongoose.Schema.Types.ObjectId, ref:"comment"}],

    title:{type:String, required:true, unique:true},
    content:{type:String, required:true},
    slug:{type:String, default:""},
    created_date:{type:Date, default:Date.now}
});

ArticleSchema.pre("save", function (next, doc) {
    this.slug = slugify(this.title);
    next();
});



ArticleSchema.pre("findOne", function (next, doc) {
    this.populate("author", "username");
    this.populate({
        path:"comments", select:"content created_date",
        populate:{
            path:"author",
            select:"username"
        }
    });
    next();
});

ArticleSchema.post("save", async function () {
    const authorModel = require("./Author");
    await authorModel.updateOne({_id:this.author._id}, {$push:{articles:this._id} }).exec();
});

const ArticleModel = mongoose.model("article", ArticleSchema);

module.exports = ArticleModel;