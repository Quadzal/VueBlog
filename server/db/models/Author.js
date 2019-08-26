const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authorSchema = new mongoose.Schema({
    role:{type:String, default:"member"},
    token:{type:String},
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    first_name:{type:String},
    last_name:{type:String},
    created_date:{type:Date, default:Date.now}
});

authorSchema.pre("save", function (next, doc) {
    this.password = bcrypt.hashSync(this.password, 10);
    this.token = jwt.sign({username:this.username}, "BLOG");
    next();
});

authorSchema.post("remove", async function(next) {
    const articleModel = require("./Article");
    await articleModel.deleteMany({author:this.username});
});

const authorModel = mongoose.model("author", authorSchema);

module.exports = authorModel;

