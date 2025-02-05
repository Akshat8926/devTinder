const express = require("express")
const connectDB = require("./config/database")
const app2 = express()

const User = require("./models/user")


app2.use(express.json())

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

app2.patch("/user", async (req, res) => {
    const data = req.body
    const userId = req.body.userId

    try {
        await User.findByIdAndUpdate({ _id: userId }, data)
        res.send("User updated successfully")

    } catch (err) {
        res.status(400).send("Something went wrong")

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

