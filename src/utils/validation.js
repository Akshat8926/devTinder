const validator = require("validator")

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body

    if (!firstName || !lastName) {
        throw new Error("Name is not valid")
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Email Id is not correct")

    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a new Password")
    }
};

module.exports = {
    validateSignUpData,
}