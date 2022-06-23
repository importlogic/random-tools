const router = require('express').Router();


router.get('/', (req, res) => {
    var isMobile = req.useragent.isMobile;
    res.render('index.ejs', {
        isMobile,
        title: "Home"
    })
});

router.get('/about', (req, res) => {
    var isMobile = req.useragent.isMobile;
    res.render('about.ejs', {
        isMobile,
        title: "About"
    })
})

router.get('/contact', (req, res) => {
    var isMobile = req.useragent.isMobile;
    res.render('contact.ejs', {
        isMobile,
        title: "Contact"
    })
})


module.exports = router;