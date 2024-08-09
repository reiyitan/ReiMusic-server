const { createUserInDb, getUserFromDb } = require("../services"); 

const createUser = (req, res) => {
    const username = req.body.username;
    const uid = req.uid;
    try {
        createUserInDb(uid, username);
        return res.status(201).json({message: "Successfully created user"});
    }
    catch (error) {
        return res.status(500).json({error: "Error creating user in database"});
    }
}

const getUser = async (req, res) => {
    const { uid } = req.params;
    if (!uid) {
        return res.status(400).json({message: "No uid provided"});
    }
    const user = await getUserFromDb(uid); 
    if (user) {
        return res.status(200).json({user});
    }
    else {
        return res.status(404).json({message: "User not found"}); 
    }
}

module.exports = { createUser, getUser };