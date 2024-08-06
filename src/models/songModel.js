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
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    },
    s3_key: {
        type: String,
        required: true
    }
});

module.exports = new mongoose.model("Song", songSchema);