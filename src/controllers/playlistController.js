const { createPlaylistInDb, deletePlaylistInDb, renamePlaylistInDb, addToPlaylistInDb, removeFromPlaylistInDb, getPlaylistsFromDb } = require("../services");

/**
 * uid in req.uid
 */
const createPlaylist = async (req, res) => {
    try {
        const newPlaylist = await createPlaylistInDb(req.uid);
        return res.status(201).json({playlist: newPlaylist});
    }
    catch (error) { 
        return res.status(500).json({error: "Error creating new playlist"});
    }
}

/**
 * path params: userId, playlistId
 */
const deletePlaylist = async (req, res) => {

}

/**
 * path params: userId, playlistId
 * body: newName
 */
const renamePlaylist = async (req, res) => {

}

/**
 * path params: userId, playlistId
 * body: songId
 */
const addToPlaylist = async (req, res) => {

}

/**
 * path params: userId, playlistId
 * body: songId
 */
const removeFromPlaylist = async (req, res) => {

}

/**
 * path params: userId, playlistId
 */
const getPlaylists = async (req, res) => {

}

module.exports = { createPlaylist, deletePlaylist, renamePlaylist, addToPlaylist, removeFromPlaylist, getPlaylists }