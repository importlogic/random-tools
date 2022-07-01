const router = require('express').Router();
const path = require("path"); 
const fs = require("fs");
const multer  = require('multer')
const upload = multer({ dest: './tmp/uploads' });
    
// Local Modules 
const encrypto = require("../modules/encrypto.js");
const clipit = require("../modules/clipit.js");
const toolsList = require('../modules/tools-data.js');
const downloader = require('../modules/downloader.js');


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
        res.redirect(`/download/${fileName}?ext=.png`);
    }
    else{
        var ok = await encrypto.decrypt(password, fileName, ext);
        if(ok){
            res.redirect(`/download/${fileName}?ext=.txt`);
        }
        else{
            res.status(500).render("broken.ejs",
            {
                code: "500"
            });
        }
    }
});

router.get("/download/:fileName", downloader.loadPage)

router.get("/download/result/:fileName", downloader.loadFile)


// clipit 

router.get("/tools/clipit", (req, res) => {
    res.render(`./tools/clipit.ejs`, {
        title: "Clipit",
        toolsList
    })
});

router.post("/tools/clipit/submit-data", async (req, res) => {
    var data = req.body.message;
    data = data.replace(/(?:\r\n|\r|\n)/g, '<br>');
    const id = await clipit.store(data);
    res.send({id});
})

router.post("/tools/clipit/get-data", async (req, res) => {
    const id = req.body.id;
    const message  = await clipit.get(id);
    res.send({message});
})



module.exports = router;