const express = require("express")
const app1 = express();


app1.use("/user", [(req, res, next) => {
    // Route hander 1
    console.log("Handling the route user 1");
    // res.send("Response 1")
    next()

}, (req, res, next) => {
    // Route handler 2
    console.log("Handling the route user 2");
    // res.send("Response 2")
    next()

}, (req, res, next) => {
    // Route handler 3
    console.log("Handling the route user 3");
    res.send("Response 3")
    // next()
}])



app1.listen(7777, () => {
    console.log("Server is successfully running");
})