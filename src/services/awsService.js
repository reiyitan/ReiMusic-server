const { s3Client } = require("../config");
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const uploadFileToS3 = async (s3_key, file) => {
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME, 
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

const getLinkFromS3 = async (s3_key) => {
    try {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: s3_key
        });
        return getSignedUrl(s3Client, command, { expiresIn: 3600 });
    }
    catch (error) {
        throw error;
    }
}

module.exports = { uploadFileToS3, getLinkFromS3 }