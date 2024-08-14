const { 
    createPlaylistInDb, 
    deletePlaylistInDb, 
    renamePlaylistInDb,
    addToPlaylistInDb, 
    removeFromPlaylistInDb, 
    getPlaylistsFromDb,
    getPlaylistFromDb,
    getSongFromDb
} = require("../services");

/**
 * uid in req.uid
 */
const createPlaylist = async (req, res) => {
    try {
        const newPlaylist = await createPlaylistInDb(req.uid);
        return res.status(201).json({playlist: newPlaylist});
    }
    catch (error) { 
        console.error(error);
        return res.status(500).json({error: "Error creating new playlist"});
    }
}

/**
 * path params: userId, playlistId
 */
const deletePlaylist = async (req, res) => {
    const { userId, playlistId } = req.params;
    try {
        deletePlaylistInDb(userId, playlistId);
        return res.status(204).end();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({error: "Error deleting playlist"});
    }
}

/**
 * path params: userId, playlistId
 * body: newName
 */
const renamePlaylist = async (req, res) => {
    const { userId, playlistId } = req.params;
    const { newName } = req.body;
    try {
        renamePlaylistInDb(userId, playlistId, newName);
        return res.status(204).end();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({error: "Error renaming playlist"});
    }
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
const getPlaylist = async (req, res) => {
    const { playlistId } = req.params;
    try {
        const playlist = await getPlaylistFromDb(playlistId); 
        const songs = await Promise.all(
            playlist.songs.map(async song => {
                const songData = await getSongFromDb(song);
                const songDataObject = songData.toObject();
                return { ...songDataObject, parentPlaylistId: playlistId };
            })
        );
        const newObject = {...playlist.toObject(), songs: songs}
        return res.status(200).json({playlist: newObject});
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({error: "Error fetching playlist"});
    }
}

/**
 * path params: playlistId
 */
const getPlaylists = async (req, res) => {
    try {
        const { userId } = req.params;
        const playlists = await getPlaylistsFromDb(userId); 
        res.status(200).json({playlists});
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({error: "Error fetching playlists"});
    }
}

module.exports = { createPlaylist, deletePlaylist, renamePlaylist, addToPlaylist, removeFromPlaylist, getPlaylist, getPlaylists }