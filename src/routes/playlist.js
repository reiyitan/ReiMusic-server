const express = require("express"); 
const router = express.Router(); 
const { checkOwner } = require("../middleware");
const { createPlaylist, deletePlaylist, renamePlaylist, addToPlaylist, removeFromPlaylist, getPlaylist, getPlaylists } = require("../controllers");

router.post("/", createPlaylist); 
router.delete("/:userId/:playlistId", checkOwner, deletePlaylist); 
router.patch("/rename/:userId/:playlistId", checkOwner, renamePlaylist);
router.patch("/add/:userId/:playlistId", checkOwner, addToPlaylist);
router.patch("/remove/:userId/:playlistId", checkOwner, removeFromPlaylist);
router.get("/:userId/:playlistId", checkOwner, getPlaylist);
router.get("/:userId", checkOwner, getPlaylists);

module.exports = router; 