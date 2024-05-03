import React, { useState } from 'react'
import './Login.css'
import img1 from '../assets/task.png'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post("http://localhost:3002/login", { email, password })
      .then(response => {
        if (response.status === 200) {
          console.log("Login successful");
          console.log(response);
          navigate('/task');
        } else {
          console.log("Login failed:", response.data.message);
          console.log("Email or password is incorrect");
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          alert("Email or Password is Incorrect")
          console.log("Login failed:", error.response.data.message);
          console.log("Email or password is incorrect");
        } else {
          console.error("Error:", error);
          // Display error message to the user, something went wrong
        }
      });
  };
  
  

  return (
    <div className='Login'>
        <div className="s-left">
            <img src={img1} alt="" />
        </div>
        <div className="s-right">
          <div className="s-r-c">
            <h1>Welcome to Tasker</h1>
            <p>Please insert your information to access your tasks</p>
            <form onSubmit={handleSubmit}>
              <div className="email">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  placeholder='user@gmail.com'
                  autoComplete='off'
                  id='input-email'
                  className='inputfield'
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="password">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  placeholder='Enter your password'
                  autoComplete='off'
                  id='input-pass'
                  className='inputfield'
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="check1">
                <input type="checkbox" className='checkbox' />
                <p>Remember me</p>
              </div>
              <button className='btn'>Sign in</button>
              <div className="acc">
                <p>Don't have an account?</p>
                 <Link to='/Register'>Sign up</Link>
              </div>
            </form>
          </div>
        </div>
    </div>
  )
}

export default Login