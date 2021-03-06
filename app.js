const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
app.use(express.static('public'))
require("dotenv").config();

const mainRouter = require('./routes/index.js');
const toolsRouter = require('./routes/tools.js');
app.use(mainRouter);
app.use(toolsRouter);

mongoose.connect(process.env.MONGODB_URL + '/live');

app.set("view engine", "ejs");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`working on ${PORT}`);
});

app.use((req, res, next) => {
    res.status(404).render("broken.ejs", {
        code: "404"
    })
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).render("broken.ejs", {
        code: "500"
    })
})
