import './App.css'
import Navbar from './components/Navbar'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
// import { useState } from 'react'
// import Modal from './components/Modal'

function App() {
  // const[isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='login-page' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='dashboard' element={<Dashboard />} />
        </Routes>
       
    </>
  )
}

export default App
