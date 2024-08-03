import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function Login({users , setUser}) {
const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '', // required
    username: '' // optional
})




function handleSubmit(e) {
    e.preventDefault()
   
 let user = users.find((user)=> user.username == formData.username && user.password == formData.password)
 console.log(user);
 
if (user) {
  window.sessionStorage.setItem('userID' , user.id)
  setUser(user.id)
  
  navigate('/' );
  // location.reload();
} else {

  console.error("invalid email or password")
}
    
}

function handleChange(e) {
    setFormData({...formData, [e.target.name] : e.target.value})
}

  return (
<div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
    flex items-center justify-center">
  <div className="w-full h-100">
    <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>
    <form className="mt-6"  onSubmit={e => handleSubmit(e)}>
      <div>
        <label className="block text-gray-700">User Name</label>
        <input type="text"  value={formData.username} name='username' onChange={e => handleChange(e)}   placeholder="user name" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autofocus autoComplete required />
      </div>
      <div className="mt-4">
        <label className="block text-gray-700">Password</label>
        <input type="password"  value={formData.password} name='password' onChange={e => handleChange(e)} placeholder="Enter Password" minLength={3} className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
      focus:bg-white focus:outline-none" required />
      </div>
      <div className="text-right mt-2">
        <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Forgot Password?</a>
      </div>
      <button type="submit" className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
    px-4 py-3 mt-6">Log In</button>
    </form>
    <hr className="my-6 border-gray-300 w-full" />
   
    <p className="mt-8">Need an account? <Link to='/regaster' className="text-blue-500 hover:text-blue-700 font-semibold">Create an
        account</Link></p>
  </div>
</div>



  )
}
