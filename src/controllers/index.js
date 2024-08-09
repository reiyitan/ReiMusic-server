const userController = require("./userController"); 
const playlistController = require("./playlistController");

module.exports = { ...userController, ...playlistController }