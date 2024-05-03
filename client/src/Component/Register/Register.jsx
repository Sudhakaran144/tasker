import React, { useState } from 'react';
import './Register.css';
import img1 from '../assets/task.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3002/register", {name, email, password})
    .then(result => {
      console.log("Registration complete");
      console.log(result);
      navigate('/task');
    })
    .catch(err => console.log(err));
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
            <div className="name">
              <label htmlFor="name">Username</label>
              <input
                type="text"
                placeholder='Username'
                autoComplete='off'
                id='input-name'
                className='inputfield'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder='user@gmail.com'
                autoComplete='off'
                id='input-email'
                className='inputfield'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="check1">
              <input type="checkbox" className='checkbox' />
              <p className='terms'>Terms and Conditions</p>
            </div>
            <button className='btn' type="submit">Sign in</button>
            <div className="acc">
              <p>Do you have an account?</p>
              <Link to='/'>Sign in</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
