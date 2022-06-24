const getPixels = require("get-pixels");
const savePixels = require("save-pixels");
const fs = require("fs");
const dir = "./tmp/";
const crypto = require("crypto");
const iv = process.env.IV;

const places = [2, 1, 2, 0, 1, 2, 1, 1, 1, 0, 0, 2, 0, 1, 0, 0];

const encrypt = async (message, password, fileName, ext) => {
    var path = `${dir}uploads/${fileName}`;
    fs.rename(path, path + ext, (e) => {});
    path += ext;

    if(password == undefined || password == "") password = process.env.DEFAULT_ENCRYPTO_PASSWORD;
    password = crypto.createHash('sha256').update(password).digest('hex').substring(0, 32);
    const encrypter = crypto.createCipheriv("aes-256-cbc", password, iv);
    message = encrypter.update(message, "utf-8", "hex");
    message += encrypter.final("hex");

    getPixels(path, (err, data) => {
        var width = data.shape[0];
        var height = data.shape[1];
        var r;
        var c;  
        r = 0;
        c = 0;

        for(var i = 0; i < message.length; i++){
            var value = message[i].charCodeAt();

            for(var shift = 0; shift < 8; shift++){
                var x = places[(shift << 1)];
                var y = places[(shift << 1) + 1];

                var oddValue = (value >> shift) & 1;
                var oddBit = data.get(c + x, r, y) & 1;

                var temp = data.get(c + x, r, y);

                if(oddValue ^ oddBit){
                    if(oddValue) data.set(c + x, r, y, temp + 1);
                    else data.set(c + x, r, y, temp - 1);
                }
            }

            var oddBit = data.get(c + 2, r, 2) & 1;
            var temp = data.get(c + 2, r, 2);

            if(i == message.length - 1) {
                if(!oddBit) data.set(c + 2, r, 2, temp + 1);
            }
            else {
                if(oddBit) data.set(c + 2, r, 2, temp - 1);		
            }

            c += 3;
            if(c >= width){
                c = 0;
                ++r;
            }
        }

        var image = savePixels(data, ext);
        image.pipe(fs.createWriteStream(`${dir}downloads/${fileName}-converted${ext}`));
        setTimeout(() => {
            fs.unlink(`${dir}downloads/${fileName}-converted${ext}`, (e) => {} );
            fs.unlink(path, (e) => {} );
        }, 5 * 60 * 1000);
    });
} 

const decrypt = async (password, fileName, ext) => {
    var path = `${dir}uploads/${fileName}`;
    fs.rename(path, path + ext, (e) => {});
    path += ext;

    getPixels(path, (err, data) => {
        var width = data.shape[0];
        var height = data.shape[1];
        var result = "";
        var done = false;

        for(var r = 0; r < height; r++){
            for(var c = 0; c < width; c += 3){
                var value = 0;
                for(var i = 7; i > -1; i--){
                    var x = places[(i << 1)];
                    var y = places[(i << 1) + 1];

                    if(data.get(c + x, r, y) & 1){
                        value += (1 << i);
                    }
                }

                result += String.fromCharCode(value);
                if(data.get(c + 2, r, 2) & 1) done = true;

                if(done) break;
            }
            if(done) break;
        }

        if(password == undefined || password == "") password = process.env.DEFAULT_ENCRYPTO_PASSWORD;
        password = crypto.createHash('sha256').update(password).digest('hex').substring(0, 32);
        const decrypter = crypto.createDecipheriv("aes-256-cbc", password, iv);
        result = decrypter.update(result, "hex", "utf8");
        result += decrypter.final("utf8");

        var writeStream = fs.createWriteStream(`${dir}downloads/${fileName}-converted.txt`);
        writeStream.write(result + '\n\n');
        writeStream.write("[For more such tools visit www.random-tools.herokuapp.com]");
        writeStream.end();
        setTimeout(() => {
            fs.unlink(`${dir}downloads/${fileName}-converted.txt`, (e) => {} );
            fs.unlink(path, (e) => {} );
        }, 5 * 60 * 1000);
    });
}

module.exports = {
    encrypt,
    decrypt
}