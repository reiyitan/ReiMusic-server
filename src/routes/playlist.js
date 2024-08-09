const express = require("express"); 
const router = express.Router(); 
const { createPlaylist, deletePlaylist, renamePlaylist, addToPlaylist, removeFromPlaylist, getPlaylists } = require("../controllers");

router.post("/", createPlaylist); 
router.delete("/:userId/:playlistId", deletePlaylist); 
router.patch("/rename/:userId/:playlistId", renamePlaylist);
router.patch("/add/:userId/:playlistId", addToPlaylist);
router.patch("/remove/:userId/:playlistId", removeFromPlaylist);
router.get("/:userId/:playlistId", getPlaylists);

module.exports = router; 