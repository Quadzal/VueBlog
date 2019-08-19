const mongoose = require("mongoose");


exports.connect_mongodb = async function connect_mongodb() {
    await mongoose.connect("mongodb://esat3535:esat3535@ds052827.mlab.com:52827/vueblog", {useNewUrlParser:true, useCreateIndex:true, useFindAndModify:false});
}