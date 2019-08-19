const express = require("express");
const router = express.Router();
const articleModel = require("../models/Article");
const authorModel = require("../models/Author");
const commentModel = require("../models/Comment");
const slugify = require("slugify");


router.get("/get/articles", async (request, response) => {
    let articles = await articleModel.find({})
    .populate("author", "username")
    .populate({path:"comments", populate:{path:"author", select:"username"}})
    .exec();
    return response.json({"articles":articles});
});

router.get("/get/article/:slug", async (request, response)  => {
    let article = await articleModel
    .findOne({slug:request.params.slug})
    .populate({path:"comments", select:"content created_date", populate:{path:"author", select:"username"}})
    .populate("author", "username")
    .exec();

    if (!article) {
        return response.status(404).json({"error":"error"})
    }
    return response.json({"article":article});
});

router.get("/search/article/:slug", async(request, response) => {
    let article = await articleModel
    .find({slug:{$regex:request.params.slug, $options:"i"}})
    .populate({path:"comments", select:"content created_date", populate:{path:"author", select:"username"}})
    .populate("author", "username")
    .exec();
    if (Object.keys(article).length == 0) {
        return response.sendStatus(404);
    }
    return response.json({"articles":article});
})

router.get("/get/authors", async (request, response) => {
    let authors = await authorModel
    .find({}, {password:0})
    .populate("articles")
    .populate("comments")
    .exec();

    return response.json(authors);
});

router.get("/get/author/:authorName", async (request, response) => {
    let author = await authorModel
    .findOne({username:request.params.authorName})
    .populate("articles")
    .populate("comments")
    .exec();
    if (author) {
        return response.json({"author":author});
    }
    return response.status(404).json({"error":"error"})
});

router.post("/add/article", async (request, response) => {
    
    let new_article = new articleModel(request.body);
    try {
        await new_article.save();
        let article = await articleModel.populate(new_article, {path:"author", select:"username"})
        return response.status(200).json({"article":article});
    } catch (error) {
        return response.status(301).json({"error":error});
    }
    
});

router.post("/add/author", async (request, response) => {

    let new_author = new authorModel(request.body);
    try {
        await new_author.save();
        return response.status(200).json({"success":"success"});
    } catch (error) {
        return response.status(301).json({"error":error});
    }
});

router.post("/add/comment", async (request, response) => {
    let new_comment = new commentModel(request.body);

    try {
        await new_comment.save();
        let comment = await commentModel.populate(new_comment, {path:"author", select:"username"});
        return response.status(200).json({comment:comment});
    } catch (err) {
        return response.status(301).json({"error":err})
    }
});


router.post("/update/article/:article_slug", async (request, response) => {
    try {
        request.body.slug = slugify(request.body.title);
        
        await articleModel.updateOne({slug:request.params.article_slug}, request.body).exec();
        let updated_article = await articleModel.findOne({_id:request.body._id}).exec();
        
        return response.status(200).json({"article":updated_article})
    } catch (error) {
        return response.status(302).json({"error":"error"});
    }
    
})

router.post("/delete/article/:article_slug", async (request, response) => {
    try {
        let slug = request.params.article_slug
        let article = await articleModel.findOne({slug:slug}).exec();
        if (article) {
            await article.delete();
            return response.status(200).json({"deleted_article":article});
        }
        return response.status(404).json({"error":"error"})
    } catch (error) {
        return response.status(404).json({"error":"error"});
    }
})

module.exports = router;