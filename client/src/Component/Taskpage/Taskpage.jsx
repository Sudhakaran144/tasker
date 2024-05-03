import React, { useState } from 'react'
import './Taskpage.css'
import logo1 from '../assets/icon.png'
import { MdCategory, MdOutlineTask, MdSettings } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import TaskWrapper from '../TaskWrapper/TaskWrapper';
import { Link } from 'react-router-dom';

const Taskpage = () => {
    const [addnotes, setAddnotes] = useState(false);
    const [cate, setCate] = useState("All");

    const handleCategoryChange = (e) => {
        setCate(e.target.value);
    }

    return (
        <div className='taskpage'>
            <div className="sidebar">
                <div className="img">
                    <img src={logo1} alt="" />
                </div>
                <div className="s-item">
                    <div className="tasks s-i-list">
                        <MdOutlineTask className='icon' />
                        <p>Tasks</p>
                    </div>
                    <div className="category s-i-list">
                        <MdCategory className='icon' />
                        <select id="category" className='s-cate' value={cate} onChange={handleCategoryChange}>
                            <option value="All">Categories</option>
                            <option value="None">None</option>
                            <option value="Home">Home</option>
                            <option value="School">School</option>
                            <option value="Shopping List">Shopping list</option>
                        </select>
                    </div>
                    <div className="setting s-i-list">
                        <MdSettings className='icon'  />
                        <p>Settings</p>
                    </div>
                </div>
                <div className="logout">
                    <Link to="/" className='log' ><TbLogout2 className='icon'/> Logout </Link>
                </div>
            </div>
            <div className="task-conatainer">
                <TaskWrapper addnotes={addnotes} setAddnotes={setAddnotes} cate={cate} setCate = {setCate} />
            </div>
        </div>
    )
}

export default Taskpage;
