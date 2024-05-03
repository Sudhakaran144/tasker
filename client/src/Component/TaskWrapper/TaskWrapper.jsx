// TaskWrapper.js

import React, { useEffect, useState } from 'react';
import Task from '../Task/Task';
import './TaskWrapper.css';
import { MdAdd } from 'react-icons/md';
import AddTask from '../AddTask/AddTask';
import axios from 'axios';
import UpdateTask from '../UpdateTask/UpdateTask';

const TaskWrapper = ({ setAddnotes, addnotes ,cate}) => {
    const [task, setTask] = useState([]);
    const [updatefunc, setUpdatefunc] = useState(false);
    const [id, setId] = useState("");
    const [filterMode, setFilterMode] = useState('all'); 
    const [filterCategory , setFilterCategory] = useState(true)
 

    useEffect(() => {
        axios.get("http://localhost:3002/")
            .then(result => {
                setTask(result.data);
            })
            .catch(err => {
                console.log("Error fetching tasks:", err);
            })
    }, []);

    const deleteTask = (id) => {
        axios.delete('http://localhost:3002/deleteTask/' + id)
            .then(result => {
                setTask(task.filter(item => item._id !== id)); 
            })
            .catch(err => console.log(err));
    }

    const handleFilter = (mode) => {
        
        setFilterMode(mode);
    }

    const updateTaskList = (taskId, checked) => {
        const updatedTaskList = task.map(item => {
            if (item._id === taskId) {
                return { ...item, checked };
            }
            return item;
        });
        setTask(updatedTaskList);
    };

    const setTaskList = (newTaskList) => {
        setTask(newTaskList);
    };

    const handleAddnote = () => {
        setAddnotes(!addnotes);
    }

    return (
        <div className='taskwrapper'>
            <div className="t-container">
                <h1>All Your Task</h1>
                <div className="task-list">
                    <div className="t-category">
                        <h3>Task</h3>
                        <div className="t-details">
                            <button className={filterMode === 'all' ? 'active' : ''} onClick={() => handleFilter('all')}>All</button>
                            <button className={filterMode === 'completed' ? 'active' : ''} onClick={() => handleFilter('completed')}>Done</button>
                            <button className={filterMode === 'notCompleted' ? 'active' : ''} onClick={() => handleFilter('notCompleted')}>Not Done</button>
                        </div>
                    </div>
                    <div className="all-task">
                    {task
                        .filter(item => {
                            let categoryFilter = false;

                            if(cate === 'Home'){
                                categoryFilter = item.category === 'Home';
                            } else if(cate === 'School'){
                                categoryFilter = item.category === 'School';
                            } else if(cate === 'Shopping List'){
                                categoryFilter = item.category === 'Shopping List';
                            } else if(cate === 'None'){
                                categoryFilter = item.category === 'None';
                            } else {
                                categoryFilter = true;  
                            }

                            if (filterMode === 'completed') {
                                return categoryFilter && item.checked;
                            } else if (filterMode === 'notCompleted') {
                                return categoryFilter && !item.checked;
                            } else {
                                return categoryFilter;
                            }
                        })
                        .map((item, i) => (
                            <Task key={i} id={item._id} task={item.task} category={item.category} checked={item.checked} deleteTask={() => deleteTask(item._id)} setUpdatefunc={setUpdatefunc} setId={setId} updateTaskList={updateTaskList} />
                        ))}

                    </div>
                    <div className="task-add">
                        <button onClick={handleAddnote}><MdAdd /> Add a task</button>
                    </div>
                    <div className="addtask1">
                        <AddTask addnotes={addnotes} setAddnotes={setAddnotes} setTaskList={setTaskList} updatefunc={updatefunc} setUpdatefunc={setUpdatefunc} />
                        <UpdateTask updatefunc={updatefunc} setUpdatefunc={setUpdatefunc} taskId={id} setTaskList={setTaskList} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskWrapper;
