const { Song } = require("../models"); 
const mongoose = require("mongoose");

const getSongsFromDb = async (q) => {
    try {
        const regex = new RegExp(q, "i");
        const songs = await Song.find({
            $or: [
                {title: {$regex: regex}},
                {artist: {$regex: regex}},
                {uploader: {$regex: regex}}
            ]
        }).exec(); 
        return songs;
    }
    catch (error) {
        throw error;
    }
}

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

const getSongFromDb = async (songId) => {
    try {
        const song = await Song.findById(songId).exec(); 
        return song;
    }
    catch (error) {
        throw error;
    }
}



module.exports = { getSongsFromDb, createUniqueId, createSongInDb, getSongFromDb }