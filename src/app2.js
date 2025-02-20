const express = require("express")
const connectDB = require("./config/database")
const { validateSignUpData } = require("./utils/validation")
const User = require("./models/user")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const { userAuthJWT } = require("./middlewares/auth.js")

const app2 = express()
app2.use(express.json())
app2.use(cookieParser())


// Add data to the database
app2.post("/signup", async (req, res) => {
    console.log(req.body)
    // here we have added the object mannually
    // const userObj = {
    //     firstName: "MS",
    //     lastName: "Dhoni",
    //     emailId: "Dhoni@123.com",
    //     password: "Dhoni@123"
    // }


    try {
        // Here when we will hit the api it will send the body parameters which is an JSON object and then express.josn() will convert it into a JS object so that it can be added to the database

        // const userObj = req.body

        // Here we are doing some API level validations to check weather the datat which is comming from the API is correct or not
        validateSignUpData(req)

        const { firstName, lastName, emailId, password } = req.body

        // This   bcrypt function returna a promise
        const passwordHash = await bcrypt.hash(password, 10)
        console.log(passwordHash)
        // Creating a new instance of the User model

        // This the best way to create a model 
        const userObj = {
            firstName,
            lastName,
            emailId,
            password: passwordHash
        }

        const user = new User(userObj)

        // This function returns a promise thats why it requires an anysc await wrap up 

        // Its always a good practise to warp up all your database calls inside a try-catch block
        await user.save();
        res.send("User adder successfully")
    } catch (err) {
        res.status(400).send("Error: " + err.message)
    }


})
// This is the login api it is used to authenticate the user
app2.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body

        const user = await User.findOne({ emailId: emailId })

        if (!user) {
            throw new Error("Email ID is not present in the DataBase")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (isPasswordValid) {

            // const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", { expiresIn: "1d" })

            const token = await user.getJWT()
            console.log(token)

            res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) })
            res.send("Login Successfull")
        } else {
            throw new Error("Passwoord is not correct")

        }

    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
})
app2.get("/profile", userAuthJWT, async (req, res) => {
    try {
        // const cookies = req.cookies

        // const { token } = cookies

        // if (!token) {
        //     throw new Error("Invalid Token")
        // }

        // // Validate the user
        // const decodedMessage = await jwt.verify(token, "DEV@Tinder$790")

        // const { _id } = decodedMessage
        // console.log(decodedMessage)
        // console.log("LoggedIn user is: " + _id)

        // const user = await User.findById(_id)

        const user = req.user

        if (!user) {
            throw new Error("User does not exists")
        }
        // console.log(cookies)
        res.send(user)
    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
})

app2.post("/sendingConnectionRequest", userAuthJWT, (req, res) => {

    const user = req.user
    console.log("Sending the Connection request")

    // res.send(" Connection request has been sent")
    res.send(`${user.firstName} has send the connection request`)
})










// Get a single user
app2.get("/user", async (req, res) => {
    const userEmail = req.body.emailId
    try {
        // This will find all the matching email ID and gives an array
        // const users = await User.find({ emailId: userEmail })

        // This will find only one record matching with it 
        const users = await User.findOne({ emailId: userEmail })
        if (!users) {
            // It will give NULL values if it is not found 
            console.log(users)
            res.status(400).send("User not found")
        } else {
            res.send(users)
        }

    } catch (err) {
        res.status(400).send("Something went wrong")

    }

})
// Feed API is used to get all the data from the database
app2.get("/feed", async (req, res) => {

    try {
        // This is used to find all the documents
        const users = await User.find({})
        res.send(users)
    } catch (err) {
        res.status(400).send("Something went wrong")
    }

})
// Delete data from the database
app2.delete("/user", async (req, res) => {
    const userId = req.body.userId
    try {

        const user = await User.findByIdAndDelete(userId)
        // Below line will also work
        // const user = await User.findByIdAndDelete({_id:userId})
        res.send("User deleted Successfully")

    } catch (err) {
        res.status(400).send("Something went wrong")
    }

})
// Update data of the user
app2.patch("/user/:userId", async (req, res) => {
    const data = req.body
    // const userId = req.body.userId
    // here we are fetching the userId from the route itself
    const userId = req.params?.userId
    try {
        // Here we have done some API level validation (Data Sanitization)
        const ALLOWED_UPDATES = ["userId", "photoUrl", "about", "gender", "age", "skills"]
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k))
        if (!isUpdateAllowed) {
            throw new Error("Update not allowed")
        }
        if (data?.skills.length > 10) {
            throw new Error("Skills cannot me more than tenf")
        }
        // here we have to notice that when we are not using runValidators parameter and if we update the schema for a particular document then it will not reflect as it will only reflect when we will add a new document, but now as we have enabled the parameter then update will run properly
        const user = await User.findByIdAndUpdate({ _id: userId }, data, { returnDocument: "after", runValidators: true, })
        res.send("User updated successfully")

    } catch (err) {
        res.status(400).send("UPDATE FAILED: " + err.message)
    }
})


connectDB().then(() => {
    console.log("Databaase connection establised");
    app2.listen(7777, () => {
        console.log("Server is successfully listening to the port");
    })
}).catch((err) => {
    console.log("Database cannot be connected");
})

