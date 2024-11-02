const mongoose = require("mongoose")

const todosSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
})

const TodosModel = mongoose.model("Todo", todosSchema)
module.exports = TodosModel