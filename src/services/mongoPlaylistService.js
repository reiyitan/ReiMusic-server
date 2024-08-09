const { Playlist } = require("../models");
const { getUserFromDb } = require("./mongoUserService");

const createPlaylistInDb = async (uid) => {
    const user = await getUserFromDb(uid); 
    const newPlaylist = new Playlist({
        name: "New Playlist",
        owner: user._id,
        songs: []
    });
    try {
        const savedPlaylist = await newPlaylist.save(); 
        user.playlists.unshift({
            name: savedPlaylist.name,
            _id: savedPlaylist._id
        });
        await user.save();
        return savedPlaylist
    }
    catch (error) {
        console.error(error); 
        throw new Error("Error creating new playlist"); 
    }
}

const deletePlaylistInDb = async (uid, playlistId) => {

}

const renamePlaylistInDb = async (playlistId) => {

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