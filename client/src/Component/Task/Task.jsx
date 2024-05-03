import React, { useEffect, useState } from 'react';
import './Task.css';
import { MdDelete, MdEdit } from 'react-icons/md';
import axios from 'axios';

const Task = ({ task, id, category, checked, deleteTask, setUpdatefunc, setId,updateTaskList  }) => {
  
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleCheckboxChange = (e) => {
    updateTaskList(id, !checked);
    const newChecked = e.target.checked;
    setIsChecked(newChecked);
    axios.put(`http://localhost:3002/updateTask/${id}`, { checked: newChecked })
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='task'>
      <div className="container-task">
        <div className="task-checked">
          <input
            type="checkbox" 
            checked={isChecked} 
            id='checkbox' 
            className='check' 
            onChange={handleCheckboxChange} 
          />
        </div>
        
        <div className="task-content">
          <div className="task-details">
            <p  style={isChecked ? { textDecoration: "line-through" } : { textDecoration: "none" }}>{task}</p>
            <small  style={isChecked ? { textDecoration: "line-through" } : { textDecoration: "none" }}>category: {category}</small>
          </div>
          <div className="task-op">
            <MdEdit className='icons' onClick={()=>{
              setUpdatefunc(true);
              setId(id);
            }} />
            <MdDelete className='icons' onClick={() => deleteTask(id)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
