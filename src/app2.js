const express = require("express")
const connectDB = require("./config/database")
const app2 = express()

const User = require("./models/user")


app2.post("/signup", async (req, res) => {
    const userObj = {
        firstName: "Virat",
        lastName: "Kholi",
        emailId: "virat@123.com",
        password: "virat@123"
    }
    // Creating a new instance of the User model
    const user = new User(userObj)
    // This function returns a promise thats why it requires an anysc await wrap up 

    // Its always a good practise to warp up all your database calls inside a try-catch block
    try {
        await user.save();
        res.send("User adder successfully")
    } catch (err) {
        res.status(400).send("Error saving the user" + err.message)
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

