const express = require("express");
const router = express.Router();
const ArticleModel = require("../db/models/Article");
const CategoryModel = require("../db/models/Category");



router.get("/get/categories", async(request, response) => {
    // Tüm Kategorileri Döndürür.
    let categories = await CategoryModel.find().exec();
    return response.json({categories:categories});
})

router.get("/get/category/:slug", async (request, response) => {
    // Kategorinin Detaylarını Döndürür..
    let category = await CategoryModel.find({slug:request.params.slug}).exec();
    return response.json({category:category});
});

router.get("/get/category/articles/:slug", async (request, response) => {
    // Kategoriye Ait Makaleleri Döndürür.
    try {
        let articles = await ArticleModel.find({category_slug:request.params.slug}).exec();
        return response.status(200).json({articles:articles})
    } catch (error) {
        return response.status(404).json({error:error});
    }
})

router.post("/add/category", async (request, response) => {
    // Kategori Ekler.
    try {
        let category = new CategoryModel(request.body);
        await category.save();
        return response.json(category);
    } catch (error) {
        return response.json(error);
    }
});

router.post("/update/category/:slug", async (request, response) => {
    // Kategoriyi Günceller.
    try {
        let updatedCategory = await CategoryModel.updateOne({slug:request.params.slug}, request.body);
        return response.status(200).json({success:updatedCategory});
    } catch (error) {
        return response.status(301).json({error:"error"});
    }
});

router.post("/delete/category/:slug", async (request, response) => {
    // Kategoriyi Siler.
    let category = await CategoryModel.findOne({slug:request.params.slug}).exec();
    await category.remove();

});

module.exports = router;