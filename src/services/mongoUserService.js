const mongoose = require("mongoose");
const { User } = require("../models");

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
        console.error(error);
        throw new Error("Error creating new user");
    }
}

const getUserFromDb = async (uid) => {
    try {
        const user = await User.findById(uid).exec(); 
        return user;
    }
    catch (error) {
        console.error(error); 
        throw new Error("Error retrieving user document"); 
    }
}

const deleteUserPlaylist = (uid, playlistId) => {
    try {
        User.updateOne(
            {_id: uid},
            {$pull: {playlists: {_id: mongoose.Types.ObjectId.createFromHexString(playlistId)}}}
        ).exec()
    }
    catch (error) {
        console.error(error);
        throw new Error("Error deleting user playlist");
    }
}

module.exports = { createUserInDb, getUserFromDb, deleteUserPlaylist }