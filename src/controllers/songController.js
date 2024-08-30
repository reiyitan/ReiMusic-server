const { 
    getSongsFromDb, 
    getUserSongsFromDb, 
    uploadFileToS3, 
    createUniqueId, 
    createSongInDb, 
    deleteSongInDb,
    removeFromAllPlaylistsInDb, 
    addSongToUser, 
    getLinkFromS3, 
    deleteSongInS3 
} = require("../services");

const getSongs = async (req, res) => {
    try {
        const { q } = req.query; 
        const songs = await getSongsFromDb(q);
        return res.status(200).json({songs: songs});
    }
    catch (error) {
        console.error(error); 
        return res.status(500).json({error: "Error retrieving songs"});
    }
}

/**
 * req.params: userId
 */
const getUserSongs = async (req, res) => {
    const { userId } = req.params; 
    try {
        const songs = await getUserSongsFromDb(userId); 
        return res.status(200).json({songs: songs});
    }
    catch (error) {
        return res.status(500).json({error: "Error retrieving songs"}); 
    }
}

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
 * path params: userId, songId
 * body: s3_key
 */
const deleteSong = async (req, res) => {
    try {
        const { songId } = req.params;
        const { s3_key } = req.body;
        await deleteSongInDb(songId);
        await removeFromAllPlaylistsInDb(songId);
        await deleteSongInS3(s3_key);
        return res.status(204).end();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({error: "Error deleting song"});
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

module.exports = { getSongs, getUserSongs, uploadSong, deleteSong, getSongLink }