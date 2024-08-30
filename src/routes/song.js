const express = require("express"); 
const router = express.Router(); 
const { getSongs, getUserSongs, uploadSong, deleteSong, getSongLink } = require("../controllers");
const { upload, checkOwner } = require("../middleware");

router.post("/", upload.single("file"), uploadSong);
router.get("/:s3_key", getSongLink);
router.get("/", getSongs);
router.get("/userSongs/:userId", getUserSongs);
router.post("/delete/:userId/:songId", checkOwner, deleteSong)

module.exports = router;