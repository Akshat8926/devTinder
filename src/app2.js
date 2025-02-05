const express = require("express")
const connectDB = require("./config/database")
const app2 = express()

const User = require("./models/user")


app2.use(express.json())


app2.post("/signup", async (req, res) => {

    console.log(req.body)
    // here we have added the object mannually
    // const userObj = {
    //     firstName: "MS",
    //     lastName: "Dhoni",
    //     emailId: "Dhoni@123.com",
    //     password: "Dhoni@123"
    // }

    // Here when we will hit the api it will send the body parameters which is an JSON object and then express.josn() will convert it into a JS object so that it can be added to the database
    const userObj = req.body
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

