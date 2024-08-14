const express = require("express"); 
const router = express.Router(); 
const { uploadSong, getSongLink } = require("../controllers");
const { upload } = require("../middleware");

router.post("/", upload.single("file"), uploadSong);
router.get("/:s3_key", getSongLink);

module.exports = router;