const router = require('express').Router();


router.get('/', (req, res) => {
    var isMobile = req.useragent.isMobile;
    res.render('index.ejs', {
        isMobile,
        title: "Home"
    })
});


module.exports = router;