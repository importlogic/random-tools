const e = require('express');
const express = require('express');
const app = express();
const useragent = require('express-useragent');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(useragent.express());
app.use(express.static('public'))
require("dotenv").config();

const mainRouter = require('./routes/index.js');
const toolsRouter = require('./routes/tools.js');
app.use(mainRouter);
app.use(toolsRouter);

app.set("view engine", "ejs");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`working on ${PORT}`);
});

app.use((req, res, next) => {
    res.status(404).render("notFound.ejs")
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).render("broken.ejs")
})
