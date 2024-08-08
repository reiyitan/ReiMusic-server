const { connectMongoose } = require("./db");
const admin = require("./auth");

module.exports = { connectMongoose, admin }