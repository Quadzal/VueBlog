const express = require("express");
const router = express.Router();
const authorModel = require("../db/models/Author");
const articleModel = require("../db/models/Article");

router.get("/get/authors", async (request, response) => {
    // Tüm Yazarları Döndürür.
    let authors = await authorModel
    .find({}, {password:0})
    .exec();

    return response.json({authors:authors});
});

router.get("/get/author/:authorName", async (request, response) => {
    // Yazarın Makalelerini Döndürür.
    let articles = await articleModel
    .findOne({author:request.params.authorName})
    .exec();

    if (author) {
        return response.json({articles:articles});
    }
    return response.status(404).json({error:"error"})
});



router.post("/add/author", async (request, response) => {
    // Yazar Ekler
    try {
        let new_author = new authorModel(request.body);
        await new_author.save();
        return response.status(200).json({success:"success"});
    } catch (error) {
        return response.status(301).json({error:error});
    }
});







module.exports = router;