var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLICKEY,
    privateKey: process.env.IMAGEKIT_PRIVATEKEY,
    urlEndpoint: process.env.IMAGEKIT_URLENDPOINT
});


function uploadFile(file){

    return new Promise((res,rej)=>{
        imagekit.upload({
            file:file.buffer,
            fileName:file.originalname,
            folder:"moody-player"
        },(error,result)=>{
            if(error){
                rej(error);
            }
            else{
                res(result);
            } 
        });
    });
}

module.exports=uploadFile