const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const database = require("./database_connect");
const apiRoutes = require("./routes/api");
const history = require("connect-history-api-fallback");
const auth = require("./routes/auth");
app.use(history());
database.connect_mongodb();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set("json spaces", 4)
app.use(cors());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    return res.sendFile("index.html");
});

app.use("/api", apiRoutes);
app.use("/api/auth", auth);
app.listen(process.env.PORT || 8000, () => {
    console.log("http://localhost:8000/");
})