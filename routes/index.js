const router = require('express').Router();
const toolsList = require('../modules/tools-data.js');


router.get('/', (req, res) => {
    res.render('index.ejs', {
        title: "Home",
        toolsList
    })
});

router.get('/about', (req, res) => {
    res.render('about.ejs', {
        title: "About",
        toolsList
    })
})

router.get('/contact', (req, res) => {
    res.render('contact.ejs', {
        title: "Contact",
        toolsList
    })
})


module.exports = router;