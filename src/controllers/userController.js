const { createUserInDb } = require("../services"); 

const createUser = (req, res) => {
    const username = req.body.username;
    const uid = req.uid;
    try {
        createUserInDb(uid, username);
        return res.status(201).json({message: "Successfully created user"});
    }
    catch (error) {
        console.error(error); 
        return res.status(500).json({error: "Error creating user in database"});
    }
}

module.exports = { createUser };