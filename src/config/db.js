const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;

const connectMongoose = async (callback) => {
    await mongoose.connect(uri);
    callback();
}

module.exports = { connectMongoose }