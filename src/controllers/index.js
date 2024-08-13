const userController = require("./userController"); 
const playlistController = require("./playlistController");
const songController = require("./songController");

module.exports = { ...userController, ...playlistController, ...songController }