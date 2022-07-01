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

const get = async (id) => {
    var received = await clipitClipboardItem.find({
        id
    })
    if(received.length){
        return received[0].data;
    }
    else{
        return -1;
    }
}


module.exports = {
    store, 
    get
}