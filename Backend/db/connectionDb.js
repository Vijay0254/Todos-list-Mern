const mongoose = require("mongoose")

async function connectDb() {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB Connected")
    }
    catch(err){
        console.log(`Error in connecting Database - ${err}`)
        process.exit(1)
    }
}

module.exports = connectDb