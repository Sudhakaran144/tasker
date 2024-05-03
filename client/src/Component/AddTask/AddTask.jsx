import React, { useEffect, useState } from 'react'
import './AddTask.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const AddTask = ({ addnotes, setAddnotes, setTaskList }) => {
    const [task, setTask] = useState('')
    const [category, setCategory] = useState('None')
    const [checked, setChecked] = useState(false)
    const navigate = useNavigate()
   

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3002/addTask", { task, category, checked:false })
            .then(result => {
                setAddnotes(false); // Close the add task form
                window.location.reload()
                setTaskList(prevTaskList => [...prevTaskList, { task, category, checked }]); // Update task list
                console.log(result);
            })
            .catch(err => console.log(err));
    };

    
    const handleDelete = () => {
        setAddnotes(false);
           
    }

    return (
        addnotes ? (
            <div className='addtask'>
                <div className="a-container">
                    <form onSubmit={handleSubmit}>
                        <div className="insert-name">
                            <label>Insert name</label>
                            <input type="text" placeholder='Task name' className='Iname' onChange={(e) => setTask(e.target.value)} required />
                        </div>
                        <div className="a-category">
                            <label>Select a category</label>
                            <select onChange={(e) => setCategory(e.target.value)} required>
                                <option value="None">None</option>
                                <option value="Home">Home</option>
                                <option value="School">School</option>
                                <option value="Shopping List">Shopping list</option>
                            </select>
                        </div>
                        <div className="buttons">
                            <button type="button" className="btn1" onClick={handleDelete}>Cancel</button>
                            <button type="submit" className='btn2'>Add</button>
                        </div>
                    </form>
                </div>
            </div>
        ) : null
    )
}

export default AddTask
