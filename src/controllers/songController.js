const { uploadFileToS3, createUniqueId, createSongInDb, addSongToUser, getLinkFromS3 } = require("../services");

/**
 * body: title, artist, duration (seconds)
 * uid: req.uid
 * file: req.file
 */
const uploadSong = async (req, res) => {
    try {
        const { title, artist, duration, username } = req.body; 
        const uid = req.uid;
        const s3_key = createUniqueId(title, artist);
        const file = req.file.buffer;
        await uploadFileToS3(s3_key, file);
        const createdSong = await createSongInDb(title, artist, duration, uid, username, s3_key);
        await addSongToUser(uid, createdSong._id);
        return res.status(200).json({song: createdSong});
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({error: "Error uploading song"});
    }
}

/**
 * req.params: s3_key
 */
const getSongLink = async (req, res) => {
    const { s3_key } = req.params;
    try {
        const songLink = await getLinkFromS3(s3_key);
        res.status(200).json({url: songLink});
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({error: "Error retrieving song file"});
    }
}

module.exports = { uploadSong, getSongLink }