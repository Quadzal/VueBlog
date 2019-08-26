const express = require("express");
const app = express();
const database = require("./server/db/database_connect");
const auth = require("./server/routes/auth");
const author = require("./server/routes/author");
const category = require("./server/routes/category");
const article = require("./server/routes/article");

app.use(history());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set("json spaces", 4)
app.use(cors());
app.use(express.static(__dirname));

database.connect_mongodb();

app.get("/", (req, res) => {
    return res.sendFile("index.html");
});

app.use("/api", [author, category, article]);
app.use("/api/auth", auth);
app.listen(process.env.PORT || 8000, () => {
    console.log("http://localhost:8000/");
})