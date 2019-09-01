const express = require("express");
const app = express();
const database = require("./server/db/database_connect");
const auth = require("./server/routes/auth");
const author = require("./server/routes/author");
const category = require("./server/routes/category");
const article = require("./server/routes/article");
const history = require("connect-history-api-fallback");
const bodyParser = require("body-parser");
const cors = require("cors");
const gzip = require("compression")

app.use(gzip());
app.use(history());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set("json spaces", 4)
app.use(cors());
app.use(express.static(__dirname, {maxage: '31557600'}));

database.connect_mongodb();

app.get("/", (req, res) => {
    return res.sendFile("index.html");
});

app.use("/api", [author, category, article]);
app.use("/api/auth", auth);
app.listen(process.env.PORT || 8000)
