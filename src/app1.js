const express = require("express")
const app1 = express();

// All these are used to explain what are middleares in Javascript

// app1.use("/user", (req, res, next) => {
//     // Route hander 1
//     console.log("Handling the route user 2");
//     res.send("Response 2")
//     next()

// })
// app1.use("/user", (req, res, next) => {
//     // Route hander 1
//     console.log("Handling the route user 1");
//     // res.send("Response 1")
//     // next()

// })

// Handle AUTH Middleware for all GET,POST... request

// const { adminAuth, userAuth } = require("./middlewares/auth.js")
// app1.use("/admin", adminAuth)

// app1.get("/user", userAuth, (req, res) => {
//     console.log("User Data Sent ");
//     res.send("User data is send")
// })

// app1.get("/admin/getAllData", (req, res, next) => {
//     // Logic for getting all the data
//     res.send("Alll data is send")

// })
// app1.get("/admin/deletUser", (req, res) => {
//     // Logic for getting all the data
//     res.send("Deleted a user")

// })


// THIS IS TO EXPLAIN HOW TO HANDLE ERROR IN ROUTES
app1.use("/", (err, req, res, next) => {
    if (err) {
        res.status(500).send("something went wrong")
    }

})

app1.get("/getUserData", (req, res, next) => {
    try {
        throw new Error("sxmlslsmc");
    }
    catch (err) {
        res.status(500).send("Some Error")

    }


})
app1.listen(7777, () => {
    console.log("Server is successfully running");
})