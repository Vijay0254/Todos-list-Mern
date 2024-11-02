import React, { useState } from 'react'
import axios from "axios"

const TodoItem = ({ todos, settodos, editId, seteditId, apicall }) => {
    const [editTitle,seteditTitle] = useState("")
    const [editDescription,seteditDescription] = useState("")
    const API_URL = "http://localhost:3500/todos"

    function handleEdit(element){
        seteditId(element._id)
        seteditTitle(element.title)
        seteditDescription(element.description)
    }

    async function handleUpdate(){
        if(editTitle.trim() !== "" && editDescription.trim() !== "")
        {
            try{
                await axios.put(`${API_URL}/${editId}`, {title: editTitle, description: editDescription})
                settodos([...todos,{title: editTitle, description: editDescription}])
                apicall()
            }
            catch(err){
                console.log(`Error in Fetching data(PUT) - ${err}`)
            }
        }
        seteditId(-1)                                   
    }

    async function handleDelete(element) {
        try{
            await axios.delete(`${API_URL}/${element._id}`)
            apicall()
        }
        catch(err){
            console.log(`Error in Fetching data(DELETE) - ${err}`)
        }
    }
                                                                                                  
    return (                   
        <section className='px-10 pt-5'>
            <h3 className='text-3xl font-bold'>Tasks</h3>
            {todos.map((element,index) =>(
                <div key={index} className='flex flex-col md:flex-row justify-between px-5 py-3 my-3 mb-5 md:gap-y-0 gap-y-3 border-slate-300 md:items-center border-[1px] '>
                    <div>
                        { editId == -1 || editId !== element._id ?
                            <>
                                <p className='text-lg font-bold'>{element.title}</p>
                                <p className='font-medium px-2'>{element.description}</p>                    
                            </> :
                            <div className='flex flex-wrap gap-3 md:gap-10 md:w-[1000px]'>
                                <input className='md:flex-1 outline-none border-[1px] border-slate-400 px-3 py-2 rounded font-medium text-lg' placeholder='Title' type="text" value={editTitle} onChange={(event) =>seteditTitle(event.target.value)}/>
                                <input className='md:flex-1 outline-none border-[1px] border-slate-400 px-3 py-2 rounded font-medium text-lg' placeholder='Description' type="text" value={editDescription} onChange={(event) =>seteditDescription(event.target.value)} />                    
                            </div>
                        }
                    </div>
                    <div className='flex gap-3'>
                        {editId == -1 || editId != element._id ? <button className='bg-green-500 py-2 px-4 hover:bg-green-400 duration-200 font-medium rounded' onClick={() =>handleEdit(element)}>Edit</button> : <button className='bg-green-500 py-2 px-4 hover:bg-green-400 duration-200 font-medium rounded' onClick={() =>handleUpdate()}>Update</button>}
                        <button className='bg-red-500 font-medium hover:bg-red-400 duration-200 text-white py-2 px-4 rounded' onClick={() =>handleDelete(element)}>Delete</button>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default TodoItem