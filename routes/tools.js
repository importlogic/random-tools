const router = require('express').Router();
const path = require("path"); 
const fs = require("fs");
const multer  = require('multer')
const upload = multer({ dest: './tmp/uploads' });
const encrypto = require("../modules/encrypto.js");


router.get('/tools', (req, res) => {
    var isMobile = req.useragent.isMobile;
    res.render('tools/tools.ejs', {
        isMobile,
        title: "Tools"
    })
})

router.get("/tools/:toolName", (req, res) => {
    var isMobile = req.useragent.isMobile;
    var toolName = req.params.toolName;
    res.render(`./tools/${toolName}.ejs`, {
        isMobile,
        title: "Encrypto"
    })
});

router.post("/tools/encrypto/:action", upload.single('file'), async (req, res) => {
    var action = req.params.action;
    var ext = path.extname(req.file.originalname);

    var fileName = req.file.filename;
    var data = req.body.data;
    var password = req.body.password;

    if(action == 'encrypt'){
        encrypto.encrypt(data, password, fileName, ext);
        res.redirect(`/tools/encrypto/download/${fileName}?ext=.png`);
    }
    else{
        var ok = await encrypto.decrypt(password, fileName, ext);
        if(ok){
            res.redirect(`/tools/encrypto/download/${fileName}?ext=.txt`);
        }
        else{
            res.status(500).render("broken.ejs");
        }
    }
});

router.get("/tools/encrypto/download/:fileName", (req, res) => {
    var fileName = req.params.fileName;
    var ext = req.query.ext;
    var isMobile = req.useragent.isMobile;
    res.render("download.ejs", {
        isMobile,
        title: "Download",
        fileName,
        ext
    })
})

router.get("/tools/encrypto/download/result/:fileName", (req, res) => {
    var fileName = req.params.fileName;
    res.download(`./tmp/downloads/${fileName}`);
})

module.exports = router;