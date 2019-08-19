const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    author:{type:mongoose.Schema.Types.ObjectId, ref:"author"},
    article:{type:mongoose.Schema.Types.ObjectId, ref:"article"},

    content:{type:String, required:true},
    created_date:{type:Date, default:Date.now}
});

commentSchema.post("save", async function () {
    const articleModel = require("./Article");
    const authorModel = require("./Author");
    await articleModel.updateOne({_id:this.article._id}, {$push:{comments:this._id} });
    await authorModel.updateOne({_id:this.author._id}, {$push:{comments:this._id} });

});

const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel