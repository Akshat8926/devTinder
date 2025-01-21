const express = require("express")

const app = express()
app.use("/hello", (req, res) => {
    res.send("Helloe from the server Akshat")
})
app.use("/hello/2", (req, res) => {
    res.send("Helloe from the server Akshat 2")
})

app.use("/", (req, res) => {
    res.send("Helloe from the server")
})




app.listen(7777, () => {
    console.log("Hello i am listening to the server with port 7777");
})