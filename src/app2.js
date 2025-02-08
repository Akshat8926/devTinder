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

