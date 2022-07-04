const tools = [
    {
        name: "Data Hider",
        shortDescription: "Hide your data in an Image in plain sight!",
        longDescription: "This tool helps you to hide your data or text in plain sight using a combination of <strong>Steganography</strong> and <strong>Cryptography</strong>. Just submit an image and your secret data along with a password of your choice. Password can also be left empty. After submitting it you will get the encrypted image which looks like the original one to human eyes. Now head over to the decrypt section and submit your image along with the password and you will be able to download a txt file along with the decrypted message in it.",
        link: "/tools/encrypto"
    },
    {
        name: "Online Clipboard",
        shortDescription: "Copy content across your devices with this online clipboard.",
        longDescription: "This tool is an Online Clipboard as the name suggests. Just paste your content here and get a Unique ID. To retrieve the message just type your Unique ID and get your data.",
        link: "/tools/clipit"
    },
]

tools.sort( (a,b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    return nameA < nameB ? -1 : 1;  
});

module.exports = tools;