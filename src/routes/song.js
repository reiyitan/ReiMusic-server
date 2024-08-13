const express = require("express"); 
const router = express.Router(); 
const { uploadSong } = require("../controllers");

router.post("/", uploadSong);

module.exports = router;