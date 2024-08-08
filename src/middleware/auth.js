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

module.exports = verifyToken;