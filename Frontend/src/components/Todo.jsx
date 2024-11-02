import React, { useState, useEffect } from 'react'
import axios from "axios"
import TodoItem from './TodoItem'

const Todo = () => {
    const [title,settitle] = useState("")
    const [description,setdescription] = useState("")
    const [todos,settodos] = useState([])
    const [message,setmessage] = useState("")
    const [error,seterror] = useState("")
    const [editId,seteditId] = useState(-1)
    const API_URL = "http://localhost:3500/todos"

    async function handleSubmit() {
        seterror("")
        if(title.trim() !== "" && description.trim() !== "")
        {
            try{
                await axios.post(API_URL, {title, description})
                settodos([...todos,{title, description}])
                setmessage("Item added Successfully")
                //to make message invisible
                setTimeout(() =>{
                    setmessage("")
                },3000)
            }
            catch(err){
                console.log(`Error in Fetching data(POST) - ${err}`)
                seterror("Unable to update")
            }
        }
        settitle("")
        setdescription("")
    }

    async function apicall() {
        try{
            const response = await axios.get(API_URL)
            settodos(response.data)
        }
        catch(err){
            console.log(`Error in fetching data(GET) - ${err}`)
        }
    }

    useEffect(() =>{
        apicall()
    }, [])

  return (
    <section>
        <div className='bg-green-700 text-white'>
            <h1 className='text-center font-bold text-3xl px-4 md:px-0 md:text-5xl py-7'>Todo Project with MERN</h1>
        </div>
        <div className='pt-5 px-10'>
            <h3 className='text-3xl font-bold'>Add Item</h3>
            <p className='text-green-700 font-medium text-lg pt-1 pb-7'>{message}</p>
            <div className='flex flex-wrap gap-5'>
                <input className='flex-1 outline-none border-[1px] border-slate-400 px-3 py-2 rounded font-medium text-lg' placeholder='Title' type="text" value={title} onChange={(event) =>settitle(event.target.value)}/>
                <input className='flex-1 outline-none border-[1px] border-slate-400 px-3 py-2 rounded font-medium text-lg' placeholder='Description' type="text" value={description} onChange={(event) =>setdescription(event.target.value)} />
                <button className='bg-gray-800 text-white px-5 py-2 hover:bg-gray-700 duration-300 font-medium rounded' onClick={() =>handleSubmit()}>Submit</button>
            </div>
            {error && <p className='text-red-600 text-lg font-medium'>{error}</p>}
        </div>
        <TodoItem todos={todos} settodos={settodos} editId={editId} seteditId={seteditId} apicall={apicall} />
    </section>
  )
}

export default Todo