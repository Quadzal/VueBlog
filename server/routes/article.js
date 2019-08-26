const express = require("express");
const router = express.Router();
const articleModel = require("../db/models/Article");

router.get("/get/articles", async (request, response) => {
    // Tüm Makaleleri Döndürür.
    let articles = await articleModel.find({})
    .exec();
    return response.json({articles:articles});
});

router.get("/get/article/:slug", async (request, response)  => {
    // Makaleyi Döndürür.
    let article = await articleModel
    .findOne({slug:request.params.slug})
    .exec();

    if (!article) {
        return response.status(404).json({error:"error"})
    }

    return response.json({article:article});
});

router.get("/search/article/:slug", async(request, response) => {
    // Makaleleri Arar.
    let articles = await articleModel
    .find({slug:{$regex:request.params.slug, $options:"i"}})
    .exec();
    if (Object.keys(article).length == 0) {
        return response.sendStatus(404);
    }
    return response.json({articles:articles});
})

router.post("/add/article", async (request, response) => {
    // Makale Ekler.
    try {
        let new_article = new articleModel(request.body);
        await new_article.save();
        return response.status(200).json({article:new_article});
    } catch (error) {
        return response.status(301).json({error:error});
    }
    
});

router.post("/update/article/:article_slug", async (request, response) => {
    // Makaleyi Günceller.
    try {

        await articleModel.updateOne({slug:request.params.article_slug}, request.body).exec();
        let updated_article = await articleModel.findOne({_id:request.body._id}).exec();
        
        return response.status(200).json({article:updated_article})
    } catch (error) {
        return response.status(302).json({"error":"error"});
    }
    
})

router.post("/delete/article/:slug", async (request, response) => {
    // Makaleyi Siler.
    try {
        let slug = request.params.slug
        let article = await articleModel.deleteOne({slug:slug}).exec();
        
        return response.status(200).json({"deleted_article":article});
    } catch (error) {
        return response.status(404).json({error:error});
    }
})

router.post("/add/comment/:slug", async (request, response) => {
    // Makaleye Yorum Ekler.
    try {
        let comment = request.body;
        let article = await articleModel.findOne({slug:request.params.slug});
        article.comments.push(comment);
        article.save();
        return response.status(200).json({comment:comment});
    } catch (err) {
        return response.status(301).json({"error":err})
    }
});


module.exports = router;