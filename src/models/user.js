const mongoose = require("mongoose")
const validator = require("validator");
const jwt = require("jsonwebtoken")


// Here we are doing Object Data Modelling as Mongoose is an ODM(Object Data Modelling library for MongoDB)
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 100,
        validate(value) {
            if (validator.isEmpty(value.trim())) {
                throw new Error("First Name cannot be empty")
            }
        }
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


userSchema.methods.getJWT = async function () {

    const user = this;
    const token = await jwt.sign({ _id: this._id }, "DEV@Tinder$790", { expiresIn: "1d" })

    return token;
}

const userModel = mongoose.model("User", userSchema)

module.exports = userModel

