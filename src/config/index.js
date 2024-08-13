const db = require("./db");
const admin = require("./auth");
const aws = require("./aws"); 

module.exports = { ...db, ...admin, ...aws }