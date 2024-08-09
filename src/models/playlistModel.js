const mongoose = require("mongoose"); 

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    owner: {
        type: String, 
        ref: "User", 
        required: true
    },
    songs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Song"
    }
});

module.exports = new mongoose.model("Playlist", playlistSchema);