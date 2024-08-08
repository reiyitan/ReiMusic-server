const express = require("express"); 
const router = express.Router(); 

const playlistRoutes = require("./playlist"); 
const songRoutes = require("./song"); 
const userRoutes = require("./user");

router.use("/playlist", playlistRoutes); 
router.use("/song", songRoutes); 
router.use("/user", userRoutes);

module.exports = router;
