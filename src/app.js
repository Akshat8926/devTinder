const express = require('express');

const app = express()

app.use("/test", (req, res) => {
    res.send("Helllo from the server")

})
app.use("/hello", (req, res) => {
    res.send("Helllo hello hello")

})
app.use("/", (req, res) => {
    res.send("Namaste from the dashboard bla bla bla  blooo")

})

app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000....");

})
