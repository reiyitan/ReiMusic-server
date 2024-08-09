const mongoUserService = require("./mongoUserService");
const mongoPlaylistService = require("./mongoPlaylistService");
const mongoSongService = require("./mongoSongService");

module.exports = { ...mongoUserService, ...mongoPlaylistService, ...mongoSongService }