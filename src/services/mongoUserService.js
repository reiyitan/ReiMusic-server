const { User } = require("../models");

const createUserInDb = async (uid, username) => {
    const newUser = new User({
        _id: uid,
        username: username,
        playlists: [],
        uploadedSongs: []
    });
    try {
        await newUser.save();
    }
    catch (error) {
        console.error(error);
        throw new Error("Error creating new user");
    }
}

const getUserFromDb = async (uid) => {
    try {
        const user = await User.findById(uid).exec(); 
        return user;
    }
    catch (error) {
        console.error(error); 
        throw new Error("Error retrieving user document"); 
    }
}

module.exports = { createUserInDb, getUserFromDb }