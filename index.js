import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://api.giphy.com/v1/gifs";
const API_KEY = "9MZNHszaHfPZ73paBEHOwlmBupc4FK2o";
const imageLimit = 20;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];
let user;
let images = [];

app.get("/", (req, res) => {
    res.render("index.ejs", { images, posts});
});

app.post("/searchGIF", async (req, res) => {
    user = req.body.user;
    const response = await axios.get(API_URL + "/search?", {
        params: {
            api_key: API_KEY,
            q: req.body.keyword,
            limit: imageLimit
        }
    });
    images = response.data.data;
    res.redirect("/");
});

app.post("/postGIF", async (req, res) => {
    posts.push({
        user: user,
        url: req.body.url
    });
    images = [];
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});