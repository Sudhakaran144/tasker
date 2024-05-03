import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Component/Login/Login'
import Register from './Component/Register/Register'
import Taskpage from './Component/Taskpage/Taskpage'
import AddTask from './Component/AddTask/AddTask'

const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
         <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/Register' element={<Register />}></Route>
          <Route path='/task' element = {<Taskpage />}></Route>
         </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App