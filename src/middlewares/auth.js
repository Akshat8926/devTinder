const express = require("express")
const jwt = require("jsonwebtoken")
const User = require("../models/user")



const adminAuth = (req, res, next) => {
    console.log("Admin auth is getting checked");
    const token = "xyz"
    const isAdminAuthorized = token === "xyz"
    if (!isAdminAuthorized) {
        res.status(401).send("UnAuthorizedRequest")
    } else {
        next();
    }
}
const userAuth = (req, res, next) => {
    console.log("Admin auth is getting checked");
    const token = "xyz"
    const isAdminAuthorized = token === "xyz"
    if (!isAdminAuthorized) {
        res.status(401).send("UnAuthorizedRequest")
    } else {
        next();
    }
}

const userAuthJWT = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            throw new Error("Token is not Valid !!!!!")
        }
        const decodedObj = await jwt.verify(token, "DEV@Tinder$790")
        const { _id } = decodedObj
        const user = await User.findById(_id)

        if (!user) {
            throw new Error("User not Found")
        }
        req.user = user
        next();
    } catch (err) {
        res.status(400).send("Error Message: " + err.message)
    }
}
module.exports = {
    adminAuth, userAuth, userAuthJWT,
}