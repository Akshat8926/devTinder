const express = require('express');

const app = express() //this creates an express application instance
// The router here we are writing is the root router if its written at the top then it will be replaced by  the other routers , if the order is changed then then all the routes will work normally 
// app.use("/", (req, res) => {
//     res.send("Namaste from the dashboard bla bla bla  blooo")

// })

// app.use("/user", (req, res) => {
//     res.send("HAHHAHAHAHAh")

// })

// This will only handle GET call to /user
// Here userId and password are query parameters
// app.get("/user", (req, res) => {

//     console.log(req.query);//http://localhost:3000/user?userId=101&password=testing
//     res.send({ firstName: "Akshat", lastName: "Srivastava" })
// })
// In thic case we are going to handel request parameters or dynamic routing
app.get("/user/:userId/:name/:password", (req, res) => {

    console.log(req.params);
    res.send({ firstName: "Akshat", lastName: "Srivastava" })
})

// app.post("/user", (req, res) => {
//     // saving data to the database
//     res.send("Save data to the database")
// })

// app.delete("/user", (req, res) => {
//     res.send("Delete call is made")
// })

// // This will match all the HTTP method API calls to /test
// app.use("/test", (req, res) => {
//     res.send("Helllo from the server")
// })

// })
// app.use("/hello", (req, res) => {
//     res.send("Helllo hello hello")

// })

app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000....");

})
