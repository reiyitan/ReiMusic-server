const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    playlists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Playlist"
    }],
    uploadedSongs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song"
    }]
});

module.exports = mongoose.model("User", userSchema);