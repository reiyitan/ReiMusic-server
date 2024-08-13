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
        throw error;
    }
}

const getUserFromDb = async (uid) => {
    try {
        const user = await User.findById(uid).exec(); 
        return user;
    }
    catch (error) {
        throw error;
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
        throw error;
    }
}

const renameUserPlaylist = async (uid, playlistId, newName) => {
    const user = await User.findById(uid).exec(); 
    const newPlaylists = user.playlists.map(playlist => (
        playlist._id.equals(mongoose.Types.ObjectId.createFromHexString(playlistId)) ? { ...playlist, name: newName } : playlist
    ));
    user.playlists = newPlaylists;
    await user.save(); 
}

const addSongToUser = async (uid, songId) => {
    const user = await User.findById(uid).exec(); 
    user.uploadedSongs.push(songId);
    await user.save();
}

const removeSongFromUser = async () => {

}

module.exports = { createUserInDb, getUserFromDb, deleteUserPlaylist, renameUserPlaylist, addSongToUser, removeSongFromUser }