const { s3Client } = require("../config");
const { PutObjectCommand } = require("@aws-sdk/client-s3");

const uploadFileToS3 = async (title, artist, duration, uid, username, s3_key, file) => {
    const command = new PutObjectCommand({
        Bucket: "reidio-songs", 
        Key: s3_key,
        Body: file
    });
    try {   
        await s3Client.send(command);
    }
    catch (error) {
        throw error;
    }
}

module.exports = { uploadFileToS3 }