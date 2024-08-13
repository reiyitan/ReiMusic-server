const authMiddleware = require("./auth");
const uploadMiddleware = require("./upload");

module.exports = { ...authMiddleware, ...uploadMiddleware };