// Local Modules 
const toolsList = require('../modules/tools-data.js');

const loadPage = (req, res) => {
    var fileName = req.params.fileName;
    var ext = req.query.ext;
    res.render("download.ejs", {
        title: "Download",
        toolsList,
        fileName,
        ext
    })
}

const loadFile = (req, res) => {
    var fileName = req.params.fileName;
    res.download(`./tmp/downloads/${fileName}`);
}

module.exports = {
    loadPage,
    loadFile
}