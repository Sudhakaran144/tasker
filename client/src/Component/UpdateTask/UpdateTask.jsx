import React, { useEffect, useState } from 'react';
import './UpdateTask.css';
import axios from 'axios';

const UpdateTask = ({ updatefunc, setUpdatefunc, taskId, setTaskList }) => {
    
    const [task, setTask] = useState('');
    const [category, setCategory] = useState('None');

    useEffect(() => {
        axios.get('http://localhost:3002/getTask/' + taskId)
            .then(result => {
                setTask(result.data.task);
                setCategory(result.data.category);
            })
            .catch(err => {
                console.log("Error fetching task:", err);
            });
    }, [taskId]);
    
    const updateTask = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3002/updateTask/" + taskId, { task: task, category: category })
            .then(result => {
                console.log("Update Result:", result);
                setUpdatefunc(!updatefunc);
                // Fetch the updated task list and update the state in TaskWrapper
                axios.get("http://localhost:3002/")
                    .then(result => {
                        setTaskList(result.data); // Update the task list
                    })
                    .catch(err => {
                        console.log("Error fetching updated task list:", err);
                    });
            })
            .catch(err => {
                console.log("Update Error:", err);
            });
    }

    return (
        updatefunc ? (
            <div className='addtask'>
                <div className="a-container">
                    <form onSubmit={updateTask}>
                        <div className="insert-name">
                            <label>Insert name</label>
                            <input type="text" placeholder='Task name' value={task} className='Iname' onChange={(e) => setTask(e.target.value)} required />
                        </div>
                        <div className="a-category">
                            <label>Select a category</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                                <option value="None">None</option>
                                <option value="Home">Home</option>
                                <option value="School">School</option>
                                <option value="Shopping List">Shopping list</option>
                            </select>
                        </div>
                        <div className="buttons">
                            <button type="button" className="btn1" onClick={() => setUpdatefunc(false)}>Cancel</button>
                            <button type="submit" className='btn2'>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        ) : null
    );
}

export default UpdateTask;
