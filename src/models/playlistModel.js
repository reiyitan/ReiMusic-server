const mongoose = require("mongoose"); 

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    },
    songs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Song"
    }
});

module.exports = new mongoose.model("Playlist", playlistSchema);