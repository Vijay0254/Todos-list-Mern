const TodosModel = require("../models/todosModel")

const todosPostController = async(req,res) =>{
    try{
        const { title, description } = req.body
        const newTodo = TodosModel({
            title: title,
            description: description
        })
        await newTodo.save()
        res.status(200).json({message: "Todo Posted Successfully"})
    }
    catch(err){
        console.log(`Error in todos Post Controller - ${err}`)
        res.status(500).json({error: "Internal Server Error"})
    }
}

const todosGetController = async(req,res) =>{
    try{
        const todos = await TodosModel.find()
        res.json(todos)
    }
    catch(err){
        console.log(`Error in todos Get Controller - ${err}`)
        res.status(500).json({error: "Internal Server Error"})
    }
}

const todosPutController = async(req,res) =>{
    try{
        const { title, description } = req.body
        const { id } = req.params
        const updatedTodo = await TodosModel.findByIdAndUpdate(id, {
            title: title,
            description: description
        }, {new: true})
        if(!updatedTodo)
        {
            return res.status(400).json({error: "Todo Not Found"})
        }
        res.status(200).json({message: "Todo Updated Successfully"})
    }
    catch(err){
        console.log(`Error in todos Put Controller - ${err}`)
        res.status(500).json({error: "Internal Server Error"})
    }
}

const todosDeleteController = async(req,res) =>{
    try{
        const { id } = req.params
        await TodosModel.findByIdAndDelete(id)
        res.status(200).json({message: "Todo Deleted Successfully"})
    }
    catch(err){
        console.log(`Error in todos Put Controller - ${err}`)
        res.status(500).json({error: "Internal Server Error"})
    }
}

module.exports = { todosPostController, todosGetController, todosPutController, todosDeleteController }