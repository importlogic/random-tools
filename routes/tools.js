const router = require('express').Router();
const path = require("path"); 
const fs = require("fs");
const multer  = require('multer')
const upload = multer({ dest: './tmp/uploads' });

// Local Modules 
const encrypto = require("../modules/encrypto.js");
const clipit = require("../modules/clipit.js");
const toolsList = require('../modules/tools-data.js');


router.get('/tools', (req, res) => {
    res.render('tools/tools.ejs', {
        title: "Tools",
        toolsList
    })
})

// encrypto 

router.get("/tools/encrypto", (req, res) => {
    res.render(`./tools/encrypto.ejs`, {
        title: "Encrypto",
        toolsList
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
    res.render("download.ejs", {
        title: "Download",
        toolsList,
        fileName,
        ext
    })
})

router.get("/tools/encrypto/download/result/:fileName", (req, res) => {
    var fileName = req.params.fileName;
    res.download(`./tmp/downloads/${fileName}`);
})


// clipit 

function clipitHome(req, res){
    res.render(`./tools/clipit.ejs`, {
        title: "Clipit",
        toolsList,
        success: false,
        message: "null",
        id: req.messageId || -1,
        failure: req.fetchFailure || false
    })
}

async function clipitSubmit(req, res, next){
    var message = req.body.data;
    message = message.replace(/(?:\r\n|\r|\n)/g, '<br/>');
    req.messageId = await clipit.store(message);
    next();
}

router.get("/tools/clipit", clipitHome);
router.post("/tools/clipit/submit", clipitSubmit, clipitHome);
router.post("/tools/clipit/retrieve", clipit.checkID, async (req, res) => {
    if(req.finalMessage != undefined){
        res.render(`./tools/clipit.ejs`, {
            title: "Clipit",
            toolsList,
            success: true,
            message: req.finalMessage,
            id: req.messageId || -1,
            failure: req.fetchFailure || false
        })
    }
});



module.exports = router;