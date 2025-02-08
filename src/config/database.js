const { mongoose } = require("mongoose")

const connectDB = async () => {
    await mongoose.connect("mongodb://localhost:27017/devTinder") // this has connected to mongodb cluster locally
}

module.exports = connectDB

// connectDB().then(() => {
//     console.log("Databaase connection establised");
// }).catch((err) => {
//     console.log("Database cannot be connected");
// })
