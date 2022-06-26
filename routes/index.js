const router = require('express').Router();
const toolsList = require('../modules/tools-data.js');


router.get('/', (req, res) => {
    var isMobile = req.useragent.isMobile;
    res.render('index.ejs', {
        isMobile,
        title: "Home",
        toolsList
    })
});

router.get('/about', (req, res) => {
    var isMobile = req.useragent.isMobile;
    res.render('about.ejs', {
        isMobile,
        title: "About",
        toolsList
    })
})

router.get('/contact', (req, res) => {
    var isMobile = req.useragent.isMobile;
    res.render('contact.ejs', {
        isMobile,
        title: "Contact",
        toolsList
    })
})


module.exports = router;