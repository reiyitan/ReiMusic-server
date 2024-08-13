const express = require("express"); 
const router = express.Router(); 
const { uploadSong } = require("../controllers");
const { upload } = require("../middleware");

router.post("/", upload.single("file"), uploadSong);

module.exports = router;