const { admin } = require("../config");

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; 
    if (!token) {
        return res.status(401).json({error: "Unauthorized"});
    }

    admin.auth().verifyIdToken(token)
        .then(decodedToken => {
            req.uid = decodedToken.user_id;
            next();
        })
        .catch(error => {
            console.error(error)
            return res.status(401).json({error: "Unauthorized"});
        });
}

const checkOwner = (req, res, next) => {
    const { userId } = req.params; //owner of the playlist or song
    const requesterId = req.uid;   //requester
    if (requesterId !== userId) {
        return res.status(401).json({error: "Unauthorized"}); 
    }
    next();
}

module.exports = { verifyToken, checkOwner };