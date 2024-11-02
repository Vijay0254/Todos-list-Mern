const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
PORT = process.env.PORT
const todosRouter = require("./router/todosRouter")
const connectDb = require("./db/connectionDb")
const cors = require("cors")

app.use(express.json())
app.use(cors())
app.use("/todos", todosRouter)

app.listen(PORT, (err) =>{
    err ? console.log(`Error in Connecting Port ${PORT}`) : console.log(`Server running in Port ${PORT}`)
    connectDb()
})
