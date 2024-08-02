import React, { useState } from 'react'
import UserNameIcon from './icon/UserNameIcon'
import PasswordIcon from './icon/PasswordIcon'
import { useNavigate } from 'react-router-dom';

export default function Register({ users, setUser }) {
  const [formData, setFormData] = useState({
    username: '', // optional
    password: ''  // required
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      window.sessionStorage.setItem('userID', data.id);
      setUser(data.id);
      navigate('/');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
      <div className="w-full h-100">
        <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Register a new account</h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-gray-700">User Name</label>
            <input 
              type="text" 
              id="username"
              value={formData.username} 
              name='username' 
              onChange={handleChange} 
              placeholder="User name" 
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" 
              autoComplete="username" 
              required 
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input 
              type="password" 
              id="password"
              value={formData.password} 
              name='password' 
              onChange={handleChange} 
              placeholder="Enter Password" 
              minLength={2} 
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
