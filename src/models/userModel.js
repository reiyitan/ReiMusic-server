const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    firebaseID: {
        type: String,
        required: true,
        unique: true
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