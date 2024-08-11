const mongoose = require("mongoose");
const { Playlist } = require("../models");
const { getUserFromDb, deleteUserPlaylist, renameUserPlaylist } = require("./mongoUserService");

const createPlaylistInDb = async (uid) => {
    try {
        const user = await getUserFromDb(uid); 
        const newPlaylist = new Playlist({
            name: "New Playlist",
            owner: user._id,
            songs: []
        });
        const savedPlaylist = await newPlaylist.save(); 
        user.playlists.unshift({
            name: savedPlaylist.name,
            _id: savedPlaylist._id
        });
        await user.save();
        return savedPlaylist
    }
    catch (error) {
        throw error;
    }
}

const deletePlaylistInDb = async (uid, playlistId) => {
    try {
        Playlist.deleteOne({_id: playlistId}).exec();
        deleteUserPlaylist(uid, playlistId);
    }
    catch (error) {
        throw error
    }
}

const renamePlaylistInDb = async (uid, playlistId, newName) => {
    try {
        const playlist = await Playlist.findById(mongoose.Types.ObjectId.createFromHexString(playlistId)).exec(); 
        playlist.name = newName; 
        await playlist.save(); 
        renameUserPlaylist(uid, playlistId, newName);
    }
    catch (error) {
        throw error;
    }
}

const addToPlaylistInDb = async (playlistId, songId) => {

}

const removeFromPlaylistInDb = async (playlistId, songId) => {

}

const getPlaylistsFromDb = async (uid) => {
    const user = await getUserFromDb(uid); 
    return user.playlists; 
}

module.exports = { createPlaylistInDb, deletePlaylistInDb, renamePlaylistInDb, addToPlaylistInDb, removeFromPlaylistInDb, getPlaylistsFromDb }