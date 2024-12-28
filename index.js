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

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/searchGIF", async (req, res) => {
    const response = await axios.get(API_URL + "/search?", {
        params: {
            api_key: API_KEY,
            q: req.body.keyword,
            limit: imageLimit
        }
    });
    res.render("index.ejs", { images: response.data.data });
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});