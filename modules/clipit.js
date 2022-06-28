const mongoose = require('mongoose');

// Local Modules 
const toolsList = require('../modules/tools-data.js');

const clipitClipboardItem = mongoose.model('clipitClipboardItem', 
    { 
        id: String,
        data: String 
    }
);

const store = (data) => {
    var id = "";
    for(var i = 0; i < 6; i++) id += Math.floor(Math.random() * 10);
    const newItem = new clipitClipboardItem({
        id,
        data
    })
    newItem.save();

    setTimeout(() => {
        clipitClipboardItem.deleteMany({id}, (err) => {
            if(err) console.log(err);
            else console.log("deleted item");
        });
    }, 15 * 60 * 1000);

    return id;
}

const checkID = async (req, res, next) => {
    const id = req.body.data;

    var received = await clipitClipboardItem.find({
        id
    })
    if(received.length){
        req.finalMessage = received[0].data;
    }
    else{
        const isMobile = req.useragent.isMobile;
        res.render(`./tools/clipit.ejs`, {
            isMobile,
            title: "Clipit",
            toolsList,
            success: false,
            message: "null",
            id: req.messageId || -1,
            failure: true
        })
    }
    
    next();
}


module.exports = {
    store, 
    checkID
}