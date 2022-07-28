const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("../db/mongoose")
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace("Bearer ", "")
        const decoded = jwt.verify(token, process.env.TOKEN)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            throw new Error({ "error": "Authenticate is Reqired" });
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send(e)
    }
}

module.exports = auth;