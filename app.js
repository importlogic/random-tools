const e = require('express');
const express = require('express');
const app = express();
const useragent = require('express-useragent');
app.use(useragent.express());
app.use(express.static('public'))

const mainRouter = require('./routes/index.js');
const toolsRouter = require('./routes/tools.js');
app.use(mainRouter);
app.use(toolsRouter);


app.set("view engine", "ejs");


const PORT = process.env.PORT || 3000;
 



app.listen(PORT, () => {
    console.log(`working on ${PORT}`);
});
