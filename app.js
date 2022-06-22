const e = require('express');
const express = require('express');
const app = express();
const useragent = require('express-useragent');
app.use(useragent.express());
app.use(express.static('public'))

const mainRouter = require('./routes/index.js');
app.use(mainRouter);


app.set("view engine", "ejs");


const PORT = process.env.PORT || 3000;
 



app.listen(PORT, () => {
    console.log(`working on ${PORT}`);
});
