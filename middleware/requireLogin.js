const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const { SECRET_KEY } = require("../keys")
const User = require("../models/user")




module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(401).json({error:"You must be logged In"})
        } else {
            const { _id } = payload
            User.findById(_id).then((userdata) => {
                userdata.password = undefined
                req.user = userdata
                next()
            })
        }
    })
}   