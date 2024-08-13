const { Song } = require("../models"); 
const mongoose = require("mongoose");

const createUniqueId = (title, artist) => {
    const id = new mongoose.Types.ObjectId().toString();
    return `${id}-${artist}-${title}`;
}

const createSongInDb = async (title, artist, duration, uid, username, s3_key) => {

}



module.exports = { createUniqueId, createSongInDb }