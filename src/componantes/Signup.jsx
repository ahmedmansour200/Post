import React, { useState } from 'react'
import UserNameIcon from './icon/UserNameIcon'
import PasswordIcon from './icon/PasswordIcon'

export default function Signup() {
  
  const [formData, setFormData] = useState({
    password: '', // required
    username: '' // optional
})

function handleSubmit(e) {
    e.preventDefault()
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => console.log(data))
}

function handleChange(e) {
    setFormData({...formData, [e.target.name] : e.target.value})
}

  return (

<form className="max-w-sm mx-auto mt-52" onSubmit={e => handleSubmit(e)}>
  <div className="mb-5">
    <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Name</label>
    <input type="text" id="Name" value={formData.username} name='username' onChange={e => handleChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="user name" required />
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" id="password" value={formData.password} name='password' onChange={e => handleChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>


  )
}
