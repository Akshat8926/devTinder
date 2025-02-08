const mongoose = require("mongoose")
const validator = require("validator");


// Here we are doing Object Data Modelling as Mongoose is an ODM(Object Data Modelling library for MongoDB)

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 100,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email ID" + value)

            }

        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Not a strong passwoord" + value)

            }

        }
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        // custom validation function
        validate(value) {
            if (!["Male", "Female", "Others"].includes(value)) {
                throw new Error("Gender data is not valid")
            }
        },
    },
    photoUrl: {
        type: String,
        default: "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid Url" + value)

            }

        }
    },
    about: {
        type: String,
        default: "This is just a random default Value"
    },
    skills: {
        type: [String],
    }
}, { timestamps: true })


const userModel = mongoose.model("User", userSchema)

module.exports = userModel