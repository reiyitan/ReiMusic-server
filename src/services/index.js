const mongoUserService = require("./mongoUserService");
const mongoPlaylistService = require("./mongoPlaylistService");
const mongoSongService = require("./mongoSongService");
const awsService = require("./awsService");

module.exports = { ...mongoUserService, ...mongoPlaylistService, ...mongoSongService, ...awsService }