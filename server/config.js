const history = require("connect-history-api-fallback");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

exports.setConfig = (app) => {
    app.use(history());
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.set("json spaces", 4)
    app.use(cors());
    app.use(express.static(__dirname));
}