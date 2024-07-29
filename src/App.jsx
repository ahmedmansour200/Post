import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route,  Routes } from 'react-router-dom'
import Home from './componantes/Home'
import Login from './componantes/Signup'
import AddPost from './componantes/AddPost'



function App() {
  return (
    <>
  <Routes>
  <Route path="/" element={<Home/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/addpost" element={<AddPost/>}></Route>
  </Routes>
    </>
      )
}

export default App
