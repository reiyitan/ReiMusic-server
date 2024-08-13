const { Song } = require("../models"); 
const mongoose = require("mongoose");

const createUniqueId = (title, artist) => {
    const id = new mongoose.Types.ObjectId().toString();
    return `${id}-${artist}-${title}`;
}

const createSongInDb = async (title, artist, duration, uid, username, s3_key) => {
    try {
        const newSong = Song({
            title: title, 
            artist: artist,
            duration: duration,
            uploaderId: uid,
            uploader: username,
            s3_key: s3_key
        });
        const savedSong = await newSong.save(); 
        return savedSong;
    }
    catch (error) {
        throw error;
    }
}



module.exports = { createUniqueId, createSongInDb }