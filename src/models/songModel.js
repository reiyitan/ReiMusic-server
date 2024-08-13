const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, 
    },
    artist: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    uploaderId: {
        type: String, 
        ref: "User", 
        required: true
    },
    uploader: {
        type: String,
        required: true
    },
    s3_key: {
        type: String,
        required: true
    }
});

module.exports = new mongoose.model("Song", songSchema);