require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const URL = require("./models/url");
const staticRouter = require("./views/staticRouter");

const urlroute = require("./routes/url")

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

app.set("view engine", 'ejs');
app.set("views", path.resolve("./views"));
app.listen(port, () => console.log(`Server is running on port ${port}`));

mongoose
.connect(process.env.MONGO_URL)
.then((e)=> console.log("MongoDB CONNECTED"));

app.use("/", urlroute);
app.use("/home", staticRouter);

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({shortId}, {$push: {visithistory: {timestamp: Date.now()}}});
    res.redirect(entry.redirectURL);
});   

