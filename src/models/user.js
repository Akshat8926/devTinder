const mongoose = require("mongoose")

// Here we are doing Object Data Modelling as Mongoose is an ODM(Object Data Modelling library for MongoDB)

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    }
})


const userModel = mongoose.model("User", userSchema)

module.exports = userModel