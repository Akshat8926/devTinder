const express = require('express');

const app = express()
// The router here we are writing is the root router if its written at the top then it will be replaced by add the other routers , if the order is changed then then all the routes will work normally 
// app.use("/", (req, res) => {
//     res.send("Namaste from the dashboard bla bla bla  blooo")

// })

app.use("/user", (req, res) => {
    res.send("HAHHAHAHAHAh")

})

// This will only handle GET call to /user
app.get("/user", (req, res) => {

    res.send({ firstName: "Akshat", lastName: "Srivastava" })
})

app.post("/user", (req, res) => {
    // saving data to the database
    res.send("Save data to the database")
})

app.delete("/user", (req, res) => {
    res.send("Delete call is made")
})

// This will match all the HTTP method API calls to /test
app.use("/test", (req, res) => {
    res.send("Helllo from the server")
})

// })
// app.use("/hello", (req, res) => {
//     res.send("Helllo hello hello")

// })

app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000....");

})
