const express = require("express"); 
const router = express.Router(); 
const { createUser, getUser } = require("../controllers"); 

router.post("/", createUser);
router.get("/:uid", getUser);

module.exports = router;