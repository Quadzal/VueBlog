const express = require("express");
const router = express.Router();
const authorModel = require("../models/Author");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
    try {
        const user = new authorModel(req.body);
        await user.save();
        return res.status(200).send({user:user});
    } catch (error) {
        return res.status(401).send({error:error})
    }
});

router.post("/login", async (req, res) => {
    let user = await authorModel.findOne({username:req.body.username}).exec();
    if (user) {
        const decoded_password = bcrypt.compareSync(req.body.password, user.password);
        
        if (decoded_password) {
            return res.send({user:user});
        }
        else{
            return res.status(401).send({"error":"Şifre Hatalı"})
        }
        
    }
    return res.status(401).send({"error":"Kullanıcı Adı Bulunamadı!"});
});

router.post("/check/token", async (req, res) => {
    try {
        let token = jwt.verify(req.body.token, "BLOG")
        const user = await authorModel.findOne({username:token.username, token:req.body.token})
        
        if (!user) {
            throw new Error();
        }

        return res.status(200).json({user:user});
    } catch (error) {
        return res.status(401).send({error:"error"});
    }
});

module.exports = router;
