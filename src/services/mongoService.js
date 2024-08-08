const { User, Song, Playlist } = require("../models");

const createUserInDb = async (uid, username) => {
    const newUser = new User({
        _id: uid,
        username: username,
        playlists: [],
        uploadedSongs: []
    });
    try {
        await newUser.save();
    }
    catch (error) {
        throw new Error("Error creating new user");
    }
}

module.exports = { createUserInDb }