const router = require('express').Router();

router.get("/tools/:toolName", (req, res) => {
    var isMobile = req.useragent.isMobile;
    var toolName = req.params.toolName;
    res.render(`./tools/${toolName}.ejs`, {
        isMobile,
        title: "Encrypto"
    })
});

module.exports = router;